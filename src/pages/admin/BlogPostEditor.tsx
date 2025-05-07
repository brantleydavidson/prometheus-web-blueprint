
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ImagePlus, Trash, Save } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const BlogPostEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load categories'
      });
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setContent(data.content?.toString() || '');
        setExcerpt(data.excerpt || '');
        setPublished(data.published || false);
        setFeaturedImage(data.featured_image || '');
        setCategoryId(data.category_id || '');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load post'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Title is required'
      });
      return;
    }

    setSaving(true);
    
    const postData = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      content,
      excerpt,
      published,
      featured_image: featuredImage,
      category_id: categoryId || null,
      author_id: user?.id
    };
    
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Post updated successfully'
        });
      } else {
        // Fixed: Wrap the object in curly braces, not square brackets
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            ...postData,
            created_at: new Date().toISOString() // Convert Date to string
          });
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Post created successfully'
        });
      }
      
      navigate('/admin/blog-posts');
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save post'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('cms-assets')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('cms-assets')
        .getPublicUrl(filePath);
        
      // Save reference in assets table
      const { error: dbError } = await supabase
        .from('assets')
        .insert({
          name: file.name,
          file_path: publicUrlData.publicUrl,
          file_type: file.type,
          file_size: file.size,
          created_by: user?.id
        });
        
      if (dbError) throw dbError;
      
      setFeaturedImage(publicUrlData.publicUrl);
      
      toast({
        title: 'Upload success',
        description: 'Image was uploaded successfully'
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'Failed to upload image'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prometheus-orange"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/admin/blog-posts')} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
          <h2 className="text-2xl font-semibold text-prometheus-navy">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/blog-posts')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave blank to auto-generate from title
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea 
                    id="excerpt" 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary of the post" 
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Post content" 
                    rows={10}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch 
                    id="published" 
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Uncategorized</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <div className="mt-2">
                    {featuredImage ? (
                      <div className="relative">
                        <img 
                          src={featuredImage} 
                          alt="Featured" 
                          className="w-full h-48 object-cover rounded-md" 
                        />
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => setFeaturedImage('')}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <ImagePlus className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Upload featured image
                        </p>
                        <input
                          type="file"
                          id="imageUpload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadImage}
                        />
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => document.getElementById('imageUpload')?.click()}
                        >
                          Select Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;

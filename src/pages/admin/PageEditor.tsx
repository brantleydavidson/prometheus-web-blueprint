
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
import { ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const PageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [template, setTemplate] = useState('default');

  useEffect(() => {
    if (id) {
      fetchPage();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setTemplate(data.template || 'default');
        setPublished(data.published || false);
        setMetaTitle(data.meta_title || '');
        setMetaDescription(data.meta_description || '');
        
        // Handle content based on content type
        if (typeof data.content === 'object') {
          setContent(JSON.stringify(data.content, null, 2));
        } else {
          setContent(data.content?.toString() || '');
        }
      }
    } catch (error: any) {
      console.error('Error fetching page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load page'
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
    
    let contentObj = {};
    try {
      contentObj = content ? JSON.parse(content) : {};
    } catch (e) {
      // If content is not valid JSON, use it as a string
      contentObj = { text: content };
    }
    
    const pageData = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      template,
      content: contentObj,
      published,
      meta_title: metaTitle || title,
      meta_description: metaDescription,
      updated_by: user?.id,
      updated_at: new Date().toISOString()
    };
    
    try {
      if (id) {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page updated successfully'
        });
      } else {
        // Create new page
        const { error } = await supabase
          .from('pages')
          .insert({
            ...pageData,
            created_by: user?.id,
          });
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page created successfully'
        });
      }
      
      navigate('/admin/pages');
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save page'
      });
    } finally {
      setSaving(false);
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
          <Button variant="ghost" onClick={() => navigate('/admin/pages')} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pages
          </Button>
          <h2 className="text-2xl font-semibold text-prometheus-navy">
            {id ? 'Edit Page' : 'Create New Page'}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/pages')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Page'}
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
                    placeholder="Enter page title" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input 
                    id="slug" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="page-url-slug" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave blank to auto-generate from title
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="content">Content (JSON format)</Label>
                  <Textarea 
                    id="content" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Page content in JSON format" 
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter page content in JSON format
                  </p>
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
                  <Label htmlFor="template">Template</Label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="contact">Contact Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Meta title for SEO" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Meta description for SEO" 
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;

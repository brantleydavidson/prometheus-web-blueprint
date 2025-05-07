
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { PagesList } from '@/components/admin/PagesList';
import { DeletePageDialog } from '@/components/admin/DeletePageDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Page {
  id: string;
  title: string;
  slug: string;
  template: string;
  published: boolean;
  updated_at: string;
}

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    template: 'default',
    published: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load pages'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPage({ ...newPage, [name]: value });
    
    // Auto-generate slug from title if slug is empty
    if (name === 'title' && !newPage.slug) {
      setNewPage({
        ...newPage,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      });
    }
  };

  const handleTemplateChange = (value: string) => {
    setNewPage({ ...newPage, template: value });
  };

  const createPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert({
          title: newPage.title,
          slug: newPage.slug,
          template: newPage.template,
          published: newPage.published,
          content: {},
          created_by: user?.id
        })
        .select();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page created successfully'
      });
      
      setIsDialogOpen(false);
      setNewPage({
        title: '',
        slug: '',
        template: 'default',
        published: false
      });
      
      fetchPages();
    } catch (error: any) {
      console.error('Error creating page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create page'
      });
    }
  };

  const handleEdit = (pageId: string) => {
    navigate(`/admin/pages/edit/${pageId}`);
  };

  const handleView = (pageSlug: string) => {
    // For the home page (empty slug), just open the root URL
    const url = pageSlug === '' ? '/' : `/${pageSlug}`;
    window.open(url, '_blank');
  };
  
  const confirmDelete = (page: Page) => {
    setPageToDelete(page);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDelete = async () => {
    if (!pageToDelete) return;
    
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageToDelete.id);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Page deleted successfully'
      });
      
      fetchPages();
    } catch (error: any) {
      console.error('Error deleting page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete page'
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-prometheus-navy">Pages</h2>
          <p className="text-gray-500">Manage website pages</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prometheus-orange"></div>
        </div>
      ) : (
        <PagesList 
          pages={pages}
          onEdit={handleEdit}
          onDelete={confirmDelete}
          onView={handleView}
        />
      )}

      {/* Create Page Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Enter the details for your new page.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={newPage.title} 
                onChange={handleInputChange} 
                placeholder="Page Title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input 
                id="slug" 
                name="slug" 
                value={newPage.slug} 
                onChange={handleInputChange} 
                placeholder="page-url-slug"
              />
              <p className="text-xs text-gray-500">The URL will be: yourdomain.com/{newPage.slug || 'page-slug'}</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="template">Template</Label>
              <Select 
                value={newPage.template} 
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="contact">Contact Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={createPage}>Create Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <DeletePageDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        pageName={pageToDelete?.title}
      />
    </div>
  );
};

export default Pages;

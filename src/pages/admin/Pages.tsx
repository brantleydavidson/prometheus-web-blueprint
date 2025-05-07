import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash, Eye, ExternalLink } from 'lucide-react';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);
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

  const handleInputChange = (e) => {
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

  const handleTemplateChange = (value) => {
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
    } catch (error) {
      console.error('Error creating page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create page'
      });
    }
  };

  const handleEdit = (pageId) => {
    navigate(`/admin/pages/edit/${pageId}`);
  };

  const handleView = (pageSlug) => {
    // For the home page (empty slug), just open the root URL
    const url = pageSlug === '' ? '/' : `/${pageSlug}`;
    window.open(url, '_blank');
  };
  
  const confirmDelete = (page) => {
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
    } catch (error) {
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
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.length > 0 ? (
                pages.map((page: any) => (
                  <tr key={page.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{page.title}</div>
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.template}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(page.slug)}
                          title="View page"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(page.id)}
                          title="Edit page"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => confirmDelete(page)}
                          title="Delete page"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        {page.published && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleView(page.slug)}
                            title="Open in new tab"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No pages found. Create your first page to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the page "{pageToDelete?.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Pages;

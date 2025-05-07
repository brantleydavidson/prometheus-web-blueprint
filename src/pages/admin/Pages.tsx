
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { PagesList } from '@/components/admin/PagesList';
import { CreatePageDialog } from '@/components/admin/CreatePageDialog';
import { DeletePageDialog } from '@/components/admin/DeletePageDialog';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch pages on component mount
  useEffect(() => {
    console.log("Fetching pages from Supabase");
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
      
      console.log("Pages fetched:", data);
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

  const handleEdit = (pageId: string) => {
    console.log('Edit clicked for page:', pageId);
    navigate(`/admin/pages/edit/${pageId}`);
  };

  const handleView = (pageSlug: string) => {
    console.log('View clicked for page:', pageSlug);
    // For the home page (empty slug), just open the root URL
    const url = pageSlug === '' ? '/' : `/${pageSlug}`;
    window.open(url, '_blank');
  };
  
  const confirmDelete = (page: Page) => {
    console.log('Delete clicked for page:', page);
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
        <Button onClick={() => setIsCreateDialogOpen(true)}>
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
      <CreatePageDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={fetchPages}
      />
      
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

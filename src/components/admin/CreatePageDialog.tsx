
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface CreatePageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePageDialog = ({ isOpen, onClose, onSuccess }: CreatePageDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    template: 'default',
    published: false
  });

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
      
      resetAndClose();
      onSuccess();
    } catch (error: any) {
      console.error('Error creating page:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create page'
      });
    }
  };
  
  const resetAndClose = () => {
    setNewPage({
      title: '',
      slug: '',
      template: 'default',
      published: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
          <Button onClick={createPage}>Create Page</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { defaultContentTemplates } from '@/utils/pageTemplates';
import { useAuth } from '@/providers/AuthProvider';

export const usePageEditorData = (id: string | undefined) => {
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
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPage();
    } else {
      // Set default template content for new pages
      setContent(JSON.stringify(defaultContentTemplates.default, null, 2));
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // When template changes, update the default content if it's a new page
    if (!id && template) {
      setContent(JSON.stringify(
        defaultContentTemplates[template as keyof typeof defaultContentTemplates] || 
        defaultContentTemplates.default, 
        null, 
        2
      ));
    }
  }, [template, id]);

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
        setIsHomePage(data.slug === '');
        
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

  return {
    loading,
    saving,
    setSaving,
    title,
    setTitle,
    slug,
    setSlug,
    content,
    setContent,
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    published,
    setPublished,
    template,
    setTemplate,
    isHomePage,
    user
  };
};

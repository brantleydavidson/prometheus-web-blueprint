
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageEditorHeader from '@/components/admin/PageEditorHeader';
import PageContentForm from '@/components/admin/PageContentForm';
import PageSettingsSidebar from '@/components/admin/PageSettingsSidebar';
import HomePageWarning from '@/components/admin/HomePageWarning';
import { usePageEditorData } from '@/hooks/usePageEditorData';

const PageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
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
  } = usePageEditorData(id);

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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid JSON content. Please check your syntax.'
      });
      setSaving(false);
      return;
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
      <PageEditorHeader 
        isEditing={!!id}
        saving={saving}
        isHomePage={isHomePage}
        handleSave={handleSave}
      />

      {isHomePage && <HomePageWarning />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PageContentForm
            title={title}
            setTitle={setTitle}
            slug={slug}
            setSlug={setSlug}
            content={content}
            setContent={setContent}
            isHomePage={isHomePage}
          />
        </div>
        
        <div className="space-y-6">
          <PageSettingsSidebar
            published={published}
            setPublished={setPublished}
            template={template}
            setTemplate={setTemplate}
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            isHomePage={isHomePage}
          />
        </div>
      </div>
    </div>
  );
};

export default PageEditor;

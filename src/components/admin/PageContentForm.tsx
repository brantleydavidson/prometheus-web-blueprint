
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PageContentFormProps {
  title: string;
  setTitle: (title: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
  content: string;
  setContent: (content: string) => void;
  isHomePage: boolean;
}

const PageContentForm: React.FC<PageContentFormProps> = ({
  title,
  setTitle,
  slug,
  setSlug,
  content,
  setContent,
  isHomePage
}) => {
  return (
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
              disabled={isHomePage}
            />
          </div>
          
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input 
              id="slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="page-url-slug" 
              disabled={isHomePage}
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
              disabled={isHomePage}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter page content in JSON format
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageContentForm;

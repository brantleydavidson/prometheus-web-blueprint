
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PageSettingsSidebarProps {
  published: boolean;
  setPublished: (published: boolean) => void;
  template: string;
  setTemplate: (template: string) => void;
  metaTitle: string;
  setMetaTitle: (metaTitle: string) => void;
  metaDescription: string;
  setMetaDescription: (metaDescription: string) => void;
  isHomePage: boolean;
}

const PageSettingsSidebar: React.FC<PageSettingsSidebarProps> = ({
  published,
  setPublished,
  template,
  setTemplate,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  isHomePage
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="published">Published</Label>
            <Switch 
              id="published" 
              checked={published}
              onCheckedChange={setPublished}
              disabled={isHomePage}
            />
          </div>
          
          <div>
            <Label htmlFor="template">Template</Label>
            <Select 
              value={template} 
              onValueChange={setTemplate}
              disabled={isHomePage}
            >
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
              disabled={isHomePage}
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
              disabled={isHomePage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSettingsSidebar;

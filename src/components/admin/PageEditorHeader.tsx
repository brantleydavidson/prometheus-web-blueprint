
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface PageEditorHeaderProps {
  isEditing: boolean;
  saving: boolean;
  isHomePage: boolean;
  handleSave: () => void;
}

const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({ 
  isEditing, 
  saving, 
  isHomePage, 
  handleSave 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/admin/pages')} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </Button>
        <h2 className="text-2xl font-semibold text-prometheus-navy">
          {isEditing ? 'Edit Page' : 'Create New Page'}
        </h2>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/pages')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving || isHomePage}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Page'}
        </Button>
      </div>
    </div>
  );
};

export default PageEditorHeader;

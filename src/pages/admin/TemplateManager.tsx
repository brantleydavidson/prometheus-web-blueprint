
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, FileText, Copy, Edit, Trash } from 'lucide-react';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load templates'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter((template: any) => {
    return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           template.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pageTemplates = filteredTemplates.filter((template: any) => template.type === 'page');
  const sectionTemplates = filteredTemplates.filter((template: any) => template.type === 'section');
  const emailTemplates = filteredTemplates.filter((template: any) => template.type === 'email');

  const renderTemplateGrid = (templateList: any[]) => {
    if (templateList.length === 0) {
      return (
        <div className="text-center py-10 border rounded-md">
          <FileText className="h-10 w-10 mx-auto text-gray-300" />
          <p className="mt-2 text-gray-500">No templates found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templateList.map((template: any) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="h-32 bg-gray-100 flex items-center justify-center border-b">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-base">{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-500 mb-4">{template.description}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="text-red-500">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="overflow-hidden border-dashed">
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <PlusCircle className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium">Create Template</h3>
            <p className="text-sm text-gray-500 text-center mt-2 mb-4">
              Add a new template to your collection
            </p>
            <Button>Create New</Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-prometheus-navy">Templates</h2>
          <p className="text-gray-500">Manage content templates</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prometheus-orange"></div>
        </div>
      ) : (
        <Tabs defaultValue="page">
          <TabsList className="mb-6">
            <TabsTrigger value="page">Page Templates ({pageTemplates.length})</TabsTrigger>
            <TabsTrigger value="section">Section Templates ({sectionTemplates.length})</TabsTrigger>
            <TabsTrigger value="email">Email Templates ({emailTemplates.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="page">
            {renderTemplateGrid(pageTemplates)}
          </TabsContent>
          
          <TabsContent value="section">
            {renderTemplateGrid(sectionTemplates)}
          </TabsContent>
          
          <TabsContent value="email">
            {renderTemplateGrid(emailTemplates)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TemplateManager;

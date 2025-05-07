
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash, Download, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/providers/AuthProvider';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load media assets'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    toast({
      title: 'Upload started',
      description: `Uploading ${files.length} file${files.length > 1 ? 's' : ''}`
    });
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      try {
        // Upload to Storage
        const { error: uploadError } = await supabase.storage
          .from('cms-assets')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('cms-assets')
          .getPublicUrl(filePath);
          
        // Save reference in assets table
        const { error: dbError } = await supabase
          .from('assets')
          .insert({
            name: file.name,
            file_path: publicUrlData.publicUrl,
            file_type: file.type,
            file_size: file.size,
            created_by: user?.id
          });
          
        if (dbError) throw dbError;
        
        toast({
          title: 'Upload success',
          description: `${file.name} was uploaded successfully`
        });
      } catch (error: any) {
        console.error('Error uploading file:', error);
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: error.message || 'Failed to upload file'
        });
      }
    }
    
    // Refresh the assets list
    fetchAssets();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'The URL has been copied to your clipboard'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-prometheus-navy">Media Assets</h2>
          <p className="text-gray-500">Manage your images and files</p>
        </div>
        <div>
          <input
            type="file"
            id="fileUpload"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button onClick={() => document.getElementById('fileUpload')?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prometheus-orange"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.length > 0 ? (
            assets.map((asset: any) => (
              <div key={asset.id} className="bg-white rounded-md shadow overflow-hidden group">
                <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                  {asset.file_type.startsWith('image/') ? (
                    <img 
                      src={asset.file_path} 
                      alt={asset.alt_text || asset.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg 
                        className="h-16 w-16" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-sm mt-2">{asset.file_type.split('/')[1]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button size="sm" variant="secondary" onClick={() => window.open(asset.file_path, '_blank')}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => copyToClipboard(asset.file_path)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate" title={asset.name}>{asset.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {asset.file_size ? `${(asset.file_size / 1024).toFixed(2)} KB` : 'Size unknown'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-white rounded-md shadow">
              <div className="text-gray-400 mb-2">
                <Upload className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium">No assets found</h3>
              <p className="text-gray-500">Upload files to add them to your media library</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Upload Files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assets;

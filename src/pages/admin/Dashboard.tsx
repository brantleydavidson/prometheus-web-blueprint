
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, PenTool, FolderTree, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    pages: 0,
    blogPosts: 0,
    categories: 0,
    assets: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      
      try {
        const [pagesResult, postsResult, categoriesResult, assetsResult] = await Promise.all([
          supabase.from('pages').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
          supabase.from('categories').select('id', { count: 'exact', head: true }),
          supabase.from('assets').select('id', { count: 'exact', head: true })
        ]);
        
        setCounts({
          pages: pagesResult.count || 0,
          blogPosts: postsResult.count || 0,
          categories: categoriesResult.count || 0,
          assets: assetsResult.count || 0
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const chartData = [
    { name: 'Pages', value: counts.pages },
    { name: 'Blog Posts', value: counts.blogPosts },
    { name: 'Categories', value: counts.categories },
    { name: 'Assets', value: counts.assets }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.pages}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link to="/admin/pages" className="text-prometheus-orange hover:underline">
                Manage Pages
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.blogPosts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link to="/admin/blog-posts" className="text-prometheus-orange hover:underline">
                Manage Blog Posts
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.categories}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link to="/admin/categories" className="text-prometheus-orange hover:underline">
                Manage Categories
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media Assets</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.assets}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Link to="/admin/assets" className="text-prometheus-orange hover:underline">
                Manage Assets
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
            <CardDescription>
              Distribution of content across your website
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF5C00" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/admin/pages" className="block">
                <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <FileText className="h-8 w-8 text-prometheus-orange mb-2" />
                  <h3 className="font-medium">Create New Page</h3>
                  <p className="text-sm text-gray-500">Add a new page to your website</p>
                </div>
              </Link>
              
              <Link to="/admin/blog-posts" className="block">
                <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <PenTool className="h-8 w-8 text-prometheus-orange mb-2" />
                  <h3 className="font-medium">Write Blog Post</h3>
                  <p className="text-sm text-gray-500">Create new content for your blog</p>
                </div>
              </Link>
              
              <Link to="/admin/categories" className="block">
                <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <FolderTree className="h-8 w-8 text-prometheus-orange mb-2" />
                  <h3 className="font-medium">Manage Categories</h3>
                  <p className="text-sm text-gray-500">Organize your content better</p>
                </div>
              </Link>
              
              <Link to="/admin/assets" className="block">
                <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <Image className="h-8 w-8 text-prometheus-orange mb-2" />
                  <h3 className="font-medium">Upload Media</h3>
                  <p className="text-sm text-gray-500">Add images and files to your library</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const getPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length === 1 && pathSegments[0] === 'admin') {
    return 'Dashboard';
  }
  const lastSegment = pathSegments[pathSegments.length - 1];
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const AdminHeader = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-prometheus-navy">{pageTitle}</h1>
          <p className="text-sm text-gray-500">Manage your content with ease</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-64 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <HelpCircle size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

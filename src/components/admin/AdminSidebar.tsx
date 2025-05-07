
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  FolderTree,
  Image,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link to={to}>
    <div
      className={cn(
        'flex items-center px-4 py-3 mb-1 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-prometheus-orange/10 text-prometheus-orange'
          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      {active && <ChevronRight size={16} className="ml-auto" />}
    </div>
  </Link>
);

const AdminSidebar = () => {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const currentPath = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-prometheus-navy">Prometheus</h1>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Content Management</p>
      </div>

      <div className="px-3 py-4 flex-1">
        <nav className="space-y-1">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={currentPath === '/admin'}
          />
          <NavItem
            to="/admin/pages"
            icon={<FileText size={18} />}
            label="Pages"
            active={currentPath === '/admin/pages'}
          />
          <NavItem
            to="/admin/blog-posts"
            icon={<PenTool size={18} />}
            label="Blog Posts"
            active={currentPath === '/admin/blog-posts'}
          />
          <NavItem
            to="/admin/categories"
            icon={<FolderTree size={18} />}
            label="Categories"
            active={currentPath === '/admin/categories'}
          />
          <NavItem
            to="/admin/assets"
            icon={<Image size={18} />}
            label="Media Assets"
            active={currentPath === '/admin/assets'}
          />
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-prometheus-navy rounded-full flex items-center justify-center text-white">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-gray-500">{profile?.email || ''}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-prometheus-navy"
          onClick={signOut}
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;

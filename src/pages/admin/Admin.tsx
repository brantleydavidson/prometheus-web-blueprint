
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import RequireAuth from '@/components/admin/RequireAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const Admin = () => {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Admin;

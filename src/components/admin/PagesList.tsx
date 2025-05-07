
import { Button } from '@/components/ui/button';
import { Edit, Trash, Eye, ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Page {
  id: string;
  title: string;
  slug: string;
  template: string;
  published: boolean;
  updated_at: string;
}

interface PagesListProps {
  pages: Page[];
  onEdit: (pageId: string) => void;
  onDelete: (page: Page) => void;
  onView: (pageSlug: string) => void;
}

export const PagesList = ({ pages, onEdit, onDelete, onView }: PagesListProps) => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.length > 0 ? (
            pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{page.title}</div>
                  <div className="text-sm text-gray-500">/{page.slug}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{page.template}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(page.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onView(page.slug)}
                      title="View page"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit(page.id)}
                      title="Edit page"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(page)}
                      title="Delete page"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    {page.published && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => onView(page.slug)}
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No pages found. Create your first page to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

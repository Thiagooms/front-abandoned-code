import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Home } from './pages/public/Home';
import { PostDetail } from './pages/public/PostDetail';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminPostDetail } from './pages/admin/AdminPostDetail';
import { PostForm } from './pages/admin/PostForm';
import { Categories } from './pages/admin/Categories';
import { CategoryForm } from './pages/admin/CategoryForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/posts/:id" element={<PublicLayout><PostDetail /></PublicLayout>} />
      <Route path="/categories/:slug" element={<PublicLayout><Home /></PublicLayout>} />

      <Route path="/admin" element={<AdminLayout><AdminHome /></AdminLayout>} />
      <Route path="/admin/posts/:id" element={<AdminLayout><AdminPostDetail /></AdminLayout>} />
      <Route path="/admin/posts/new" element={<AdminLayout><PostForm /></AdminLayout>} />
      <Route path="/admin/posts/:id/edit" element={<AdminLayout><PostForm /></AdminLayout>} />
      <Route path="/admin/categories" element={<AdminLayout><Categories /></AdminLayout>} />
      <Route path="/admin/categories/new" element={<AdminLayout><CategoryForm /></AdminLayout>} />
      <Route path="/admin/categories/:slug" element={<AdminLayout><AdminHome /></AdminLayout>} />
    </Routes>
  );
}

export default App;

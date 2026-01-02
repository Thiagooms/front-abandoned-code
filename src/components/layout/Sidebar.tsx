import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/api';
import type { CategoryResponse } from '../../types/api';
import { queryKeys } from '../../constants/queryKeys';
import './Sidebar.css';

interface CategoryTreeNode extends CategoryResponse {
  children: CategoryTreeNode[];
}

function buildCategoryTree(categories: CategoryResponse[]): CategoryTreeNode[] {
  const categoryMap = new Map<number, CategoryTreeNode>();
  const roots: CategoryTreeNode[] = [];

  categories.forEach(cat => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  categories.forEach(cat => {
    const node = categoryMap.get(cat.id);
    if (node) {
      if (cat.parentId === null) {
        roots.push(node);
      } else {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    }
  });

  return roots;
}

function CategoryTreeItem({ category }: { category: CategoryTreeNode }) {
  return (
    <li className="category-tree-item">
      <Link to={`/admin/categories/${category.slug}`} className="category-link">
        {category.name}
      </Link>
      {category.children.length > 0 && (
        <ul className="category-tree-children">
          {category.children.map(child => (
            <CategoryTreeItem key={child.id} category={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryService.getAll,
  });

  if (isLoading) {
    return (
      <aside className="sidebar">
        <div className="sidebar-section">
          <h3>Categorias</h3>
          <div className="loading">Carregando...</div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="sidebar">
        <div className="sidebar-section">
          <h3>Categorias</h3>
          <div className="error">Erro ao carregar categorias</div>
        </div>
      </aside>
    );
  }

  const categoryTree = buildCategoryTree(categories || []);

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3>Categorias</h3>
          <Link to="/admin/categories/new" className="btn btn-sm btn-primary">
            +
          </Link>
        </div>

        {categoryTree.length === 0 ? (
          <p className="sidebar-empty">Nenhuma categoria ainda</p>
        ) : (
          <ul className="category-tree">
            {categoryTree.map(category => (
              <CategoryTreeItem key={category.id} category={category} />
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h3>Filtros</h3>
        <div className="sidebar-filters">
          <Link to="/admin" className="filter-link">
            Todos os Posts
          </Link>
          <Link to="/admin?status=PUBLISHED" className="filter-link">
            Publicados
          </Link>
          <Link to="/admin?status=DRAFT" className="filter-link">
            Rascunhos
          </Link>
        </div>
      </div>
    </aside>
  );
}

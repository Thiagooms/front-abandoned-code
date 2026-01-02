import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/api';
import { queryKeys } from '../../constants/queryKeys';
import { Loading } from '../../components/common/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { getErrorMessage } from '../../utils/errorHandler';
import { CategoryCard } from '../../components/categories/CategoryCard';
import { SearchInput } from '../../components/common/SearchInput';
import type { CategoryResponse } from '../../types/api';
import './CategoriesPage.css';

export function CategoriesPage() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryService.getAll,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={`Erro ao carregar categorias: ${getErrorMessage(error)}`} />;
  }

  const allCategories = categories || [];

  const rootCategories = allCategories.filter(cat => cat.parentId === null);

  const getCategoryChildren = (parentId: number): CategoryResponse[] => {
    return allCategories.filter(cat => cat.parentId === parentId);
  };

  return (
    <div className="home-modern">
      <div className="home-modern-header">
        <SearchInput />
      </div>
      <div className="home-modern-content">
        <h2 className="home-modern-title">Categorias</h2>

        {rootCategories.length === 0 ? (
          <div className="home-modern-empty">
            <p>Nenhuma categoria disponível no momento.</p>
          </div>
        ) : (
          <div className="posts-list-modern">
            {rootCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                children={getCategoryChildren(category.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/api';
import type { CategoryResponse } from '../../types/api';
import './Categories.css';

export function Categories() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja deletar a categoria "${name}"? Posts associados perderão a categoria.`)) {
      setDeletingId(id);
      deleteMutation.mutate(id);
    }
  };

  const getCategoryLevel = (category: CategoryResponse): number => {
    return (category.fullPath?.split('/').length || 1) - 1;
  };

  const sortedCategories = [...(categories || [])].sort((a, b) => {
    const pathA = a.fullPath || a.slug;
    const pathB = b.fullPath || b.slug;
    return pathA.localeCompare(pathB);
  });

  if (isLoading) {
    return <div className="loading">Carregando categorias...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Erro ao carregar categorias: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Gerenciar Categorias</h1>
        <Link to="/admin/categories/new" className="btn btn-primary">
          Criar Nova Categoria
        </Link>
      </div>

      {sortedCategories.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>
            Nenhuma categoria criada ainda.{' '}
            <Link to="/admin/categories/new">Crie a primeira categoria</Link>!
          </p>
        </div>
      ) : (
        <div className="categories-list">
          {sortedCategories.map(category => {
            const level = getCategoryLevel(category);
            const isDeleting = deletingId === category.id;

            return (
              <div
                key={category.id}
                className="category-item"
                style={{ paddingLeft: `${level * 2}rem` }}
              >
                <div className="category-info">
                  <div className="category-main">
                    <h3>{category.name}</h3>
                    <span className="category-slug">{category.slug}</span>
                  </div>
                  {category.fullPath && (
                    <div className="category-path">{category.fullPath}</div>
                  )}
                </div>

                <div className="category-actions">
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className="btn btn-sm btn-danger"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deletando...' : 'Deletar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

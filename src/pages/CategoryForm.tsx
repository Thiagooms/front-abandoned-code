import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { categoryService } from '../services/api';
import type { CategoryRequest } from '../types/api';
import './CategoryForm.css';

export function CategoryForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CategoryRequest>();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      navigate('/categories');
    },
  });

  const selectedParentId = watch('parentId');

  const availableParents = categories?.filter(cat => {
    const level = (cat.fullPath?.split('/').length || 1) - 1;
    return level < 2;
  }) || [];

  const onSubmit = (data: CategoryRequest) => {
    const payload = {
      name: data.name,
      parentId: data.parentId || null,
    };
    createMutation.mutate(payload);
  };

  if (isLoadingCategories) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="category-form-container">
      <div className="category-form-header">
        <h1>Criar Nova Categoria</h1>
        <Link to="/categories" className="btn btn-secondary btn-sm">
          Cancelar
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="category-form">
        <div className="form-group">
          <label htmlFor="name">Nome *</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Nome é obrigatório' })}
            placeholder="Digite o nome da categoria"
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="parentId">Categoria Pai</label>
          <select id="parentId" {...register('parentId')}>
            <option value="">Nenhuma (categoria raiz)</option>
            {availableParents.map(category => (
              <option key={category.id} value={category.id}>
                {category.fullPath || category.name}
              </option>
            ))}
          </select>
          <small className="form-hint">
            Apenas categorias de nível 0 e 1 podem ter filhas (máximo 3 níveis)
          </small>
        </div>

        {selectedParentId && (
          <div className="category-preview">
            <strong>Preview do caminho:</strong>
            <span className="category-path-preview">
              {availableParents.find(c => c.id === Number(selectedParentId))?.fullPath || ''}
              / <em>nova-categoria</em>
            </span>
          </div>
        )}

        {createMutation.error && (
          <div className="error">
            Erro ao criar categoria: {createMutation.error.message}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Criando...' : 'Criar Categoria'}
          </button>
          <Link to="/categories" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

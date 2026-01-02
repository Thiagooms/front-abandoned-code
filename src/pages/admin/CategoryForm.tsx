import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categoryService } from '../../services/api';
import type { CategoryRequest } from '../../types/api';
import { queryKeys } from '../../constants/queryKeys';
import { Loading } from '../../components/common/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { getErrorMessage } from '../../utils/errorHandler';
import './CategoryForm.css';

export function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id && id !== 'new';

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryRequest>();

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: queryKeys.categories.byId(id!),
    queryFn: () => categoryService.getById(Number(id)),
    enabled: isEditMode,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      navigate('/admin/categories');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CategoryRequest) => categoryService.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.byId(id!) });
      navigate('/admin/categories');
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        parentId: category.parentId || undefined,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: CategoryRequest) => {
    const payload = {
      ...data,
      parentId: data.parentId || null,
    };

    if (isEditMode) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const isLoading = isLoadingCategory || isLoadingCategories;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  const availableParents = categories?.filter(cat => cat.id !== Number(id)) || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="category-form-container">
      <div className="category-form-header">
        <h1>{isEditMode ? 'Editar Categoria' : 'Criar Nova Categoria'}</h1>
        <Link to="/admin/categories" className="btn btn-secondary btn-sm">
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
          <select id="parentId" {...register('parentId', { valueAsNumber: true })}>
            <option value="">Nenhuma (categoria raiz)</option>
            {availableParents.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.fullPath || cat.name}
              </option>
            ))}
          </select>
          <small className="form-hint">
            Selecione uma categoria pai para criar uma subcategoria
          </small>
        </div>

        {(createMutation.error || updateMutation.error) && (
          <ErrorMessage message={`Erro ao salvar: ${getErrorMessage(createMutation.error || updateMutation.error)}`} />
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Categoria'}
          </button>
          <Link to="/admin/categories" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

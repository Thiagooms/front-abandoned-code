import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService, categoryService } from '../../services/api';
import type { PostRequest } from '../../types/api';
import './PostForm.css';

export function PostForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostRequest>();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(Number(id)),
    enabled: isEditMode,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: postService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(`/admin/posts/${data.id}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: PostRequest) => postService.update(Number(id), data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      navigate(`/admin/posts/${data.id}`);
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        categoryId: post.category?.id || undefined,
        featureImage: post.featureImage || undefined,
      });
    }
  }, [post, reset]);

  const onSubmit = (data: PostRequest) => {
    const payload = {
      ...data,
      categoryId: data.categoryId || null,
      featureImage: data.featureImage || null,
    };

    if (isEditMode) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const isLoading = isLoadingPost || isLoadingCategories;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <h1>{isEditMode ? 'Editar Post' : 'Criar Novo Post'}</h1>
        <Link to={isEditMode ? `/admin/posts/${id}` : '/admin'} className="btn btn-secondary btn-sm">
          Cancelar
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Título é obrigatório' })}
            placeholder="Digite o título do post"
          />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Categoria</label>
          <select id="categoryId" {...register('categoryId')}>
            <option value="">Sem categoria</option>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>
                {category.fullPath || category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="featureImage">Imagem de Destaque (URL)</label>
          <input
            id="featureImage"
            type="text"
            {...register('featureImage')}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Conteúdo *</label>
          <textarea
            id="content"
            {...register('content', { required: 'Conteúdo é obrigatório' })}
            placeholder="Escreva o conteúdo do post..."
            rows={15}
          />
          {errors.content && <span className="form-error">{errors.content.message}</span>}
          <small className="form-hint">
            O excerpt será gerado automaticamente a partir do conteúdo
          </small>
        </div>

        {(createMutation.error || updateMutation.error) && (
          <div className="error">
            Erro ao salvar: {(createMutation.error || updateMutation.error)?.message}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Post'}
          </button>
          <Link to={isEditMode ? `/admin/posts/${id}` : '/admin'} className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService } from '../../services/api';
import './AdminPostDetail.css';

export function AdminPostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(Number(id)),
    enabled: !!id,
  });

  const publishMutation = useMutation({
    mutationFn: () => postService.publish(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => postService.delete(Number(id)),
    onSuccess: () => {
      navigate('/admin');
    },
  });

  const handlePublish = () => {
    if (window.confirm('Deseja publicar este post?')) {
      publishMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando post...</div>;
  }

  if (error || !post) {
    return (
      <div className="error">
        Erro ao carregar post: {error ? (error as Error).message : 'Post não encontrado'}
      </div>
    );
  }

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <Link to="/admin" className="btn btn-secondary btn-sm">
          ← Voltar
        </Link>

        <div className="post-detail-actions">
          {post.status === 'DRAFT' && (
            <button
              onClick={handlePublish}
              className="btn btn-success btn-sm"
              disabled={publishMutation.isPending}
            >
              {publishMutation.isPending ? 'Publicando...' : 'Publicar'}
            </button>
          )}
          <Link to={`/admin/posts/${post.id}/edit`} className="btn btn-primary btn-sm">
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      </div>

      <article className="post-detail-content">
        <div className="post-detail-meta">
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
          <span className={`badge badge-${post.status.toLowerCase()}`}>
            {post.status}
          </span>
        </div>

        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-info">
          <time>
            Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
          {post.publishedAt && (
            <time>
              • Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          <span>• {post.viewCount} visualizações</span>
        </div>

        <div className="post-detail-body">
          {post.content}
        </div>
      </article>
    </div>
  );
}

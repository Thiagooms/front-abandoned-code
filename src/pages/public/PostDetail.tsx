import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../../services/api';
import './PostDetail.css';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(Number(id)),
    enabled: !!id,
  });

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

  if (post.status !== 'PUBLISHED') {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>
          Este post ainda não foi publicado.
        </p>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <Link to="/" className="btn btn-secondary btn-sm">
          ← Voltar
        </Link>
      </div>

      <article className="post-detail-content">
        <div className="post-detail-meta">
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>

        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-info">
          {post.publishedAt && (
            <time>
              Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
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

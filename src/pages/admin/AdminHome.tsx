import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { postService } from '../../services/api';
import type { PostResponse } from '../../types/api';
import './AdminHome.css';

export function AdminHome() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', statusFilter],
    queryFn: postService.getAll,
  });

  const filteredPosts = posts?.filter(post => {
    if (!statusFilter) return true;
    return post.status === statusFilter;
  }) || [];

  if (isLoading) {
    return <div className="loading">Carregando posts...</div>;
  }

  if (error) {
    return <div className="error">Erro ao carregar posts: {(error as Error).message}</div>;
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>Posts</h1>
        <Link to="/admin/posts/new" className="btn btn-primary">
          Criar Novo Post
        </Link>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>
            Nenhum post encontrado. {statusFilter && 'Tente remover o filtro ou '}
            <Link to="/admin/posts/new">Crie seu primeiro post</Link>!
          </p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-card-header">
                <div className="post-card-meta">
                  {post.category && (
                    <span className="post-category">{post.category.name}</span>
                  )}
                  <span className={`badge badge-${post.status.toLowerCase()}`}>
                    {post.status}
                  </span>
                </div>
                <span className="post-views">{post.viewCount} views</span>
              </div>

              <Link to={`/admin/posts/${post.id}`} className="post-card-title">
                <h2>{post.title}</h2>
              </Link>

              <p className="post-card-excerpt">{post.excerpt}</p>

              <div className="post-card-footer">
                <time className="post-date">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>

                <div className="post-actions">
                  <Link to={`/admin/posts/${post.id}/edit`} className="btn btn-sm btn-secondary">
                    Editar
                  </Link>
                  <Link to={`/admin/posts/${post.id}`} className="btn btn-sm btn-primary">
                    Ver mais
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { postService } from '../../services/api';
import type { PostResponse } from '../../types/api';
import './Home.css';

export function Home() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', statusFilter],
    queryFn: postService.getAll,
  });

  const filteredPosts = posts?.filter(post => {
    if (!statusFilter) return post.status === 'PUBLISHED';
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
        <h1>Blog</h1>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>
            Nenhum post publicado ainda.
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
                </div>
                <span className="post-views">{post.viewCount} views</span>
              </div>

              <Link to={`/posts/${post.id}`} className="post-card-title">
                <h2>{post.title}</h2>
              </Link>

              <p className="post-card-excerpt">{post.excerpt}</p>

              <div className="post-card-footer">
                <time className="post-date">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }) : new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>

                <Link to={`/posts/${post.id}`} className="btn btn-sm btn-primary">
                  Ler mais
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

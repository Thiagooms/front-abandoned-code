import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../../services/api';
import { queryKeys } from '../../constants/queryKeys';
import { Loading } from '../../components/common/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { CalendarIcon, EyeIcon } from '../../components/common/Icons';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatDate } from '../../utils/dateFormatter';
import './PostDetail.css';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: queryKeys.posts.byId(id!),
    queryFn: () => postService.getById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !post) {
    return <ErrorMessage message={`Erro ao carregar post: ${error ? getErrorMessage(error) : 'Post não encontrado'}`} />;
  }

  if (post.status !== 'PUBLISHED') {
    return (
      <div className="home-modern">
        <div className="home-modern-content">
          <div className="home-modern-empty">
            <p>Este post ainda não foi publicado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-modern">
      <div className="post-detail-container">
        <article className="post-detail-card">
          <div className="post-detail-category-badge">
            {post.category && (
              <Link
                to={`/categories/${post.category.slug}`}
                className="category-badge-link"
              >
                {post.category.name}
              </Link>
            )}
          </div>

          <h1 className="post-detail-title-modern">{post.title}</h1>

          <div className="post-detail-meta-modern">
            {post.publishedAt && (
              <div className="post-meta-item">
                <CalendarIcon />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}
            <div className="post-meta-item">
              <EyeIcon />
              <span>{post.viewCount} visualizações</span>
            </div>
          </div>

          <div className="post-detail-content-modern">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}

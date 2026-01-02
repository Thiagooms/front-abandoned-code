import { Link } from 'react-router-dom';
import type { PostResponse } from '../../types/api';
import { CalendarIcon, TagIcon, EyeIcon, HeartIcon } from '../common/Icons';
import { formatDate } from '../../utils/dateFormatter';
import './PostCard.css';

interface PostCardProps {
  post: PostResponse;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card-modern">
      <Link to={`/posts/${post.id}`} className="post-card-modern-link">
        <h2 className="post-card-modern-title">{post.title}</h2>
      </Link>

      <p className="post-card-modern-excerpt">{post.excerpt}</p>

      <div className="post-card-modern-meta">
        <div className="post-meta-item">
          <CalendarIcon className="post-meta-icon" />
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>

        {post.category && (
          <div className="post-meta-item">
            <TagIcon className="post-meta-icon" />
            <span>{post.category.name}</span>
          </div>
        )}

        <div className="post-meta-item">
          <EyeIcon className="post-meta-icon" />
          <span>{post.viewCount} Visualizações</span>
        </div>

        <div className="post-meta-item">
          <HeartIcon className="post-meta-icon" />
          <span>0 Curtidas</span>
        </div>
      </div>
    </article>
  );
}

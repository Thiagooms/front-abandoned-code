import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { postService } from '../../services/api';
import { queryKeys } from '../../constants/queryKeys';
import { Loading } from '../../components/common/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { getErrorMessage } from '../../utils/errorHandler';
import { PostCard } from '../../components/posts/PostCard';
import { SearchInput } from '../../components/common/SearchInput';
import './Home.css';

export function Home() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  const { data: posts, isLoading, error } = useQuery({
    queryKey: queryKeys.posts.byStatus(statusFilter),
    queryFn: postService.getAll,
  });

  const filteredPosts = posts?.filter(post => {
    if (!statusFilter) return post.status === 'PUBLISHED';
    return post.status === statusFilter;
  }) || [];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={`Erro ao carregar posts: ${getErrorMessage(error)}`} />;
  }

  return (
    <div className="home-modern">
      <div className="home-modern-header">
        <SearchInput /> {/* Use the new SearchInput component */}
      </div>

      <section className="home-modern-content">
        <h2 className="home-modern-title">PUBLICAÇÕES RECENTES</h2>

        {filteredPosts.length === 0 ? (
          <div className="home-modern-empty">
            <p>Nenhum post publicado ainda.</p>
          </div>
        ) : (
          <div className="posts-list-modern">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

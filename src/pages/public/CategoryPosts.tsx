import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { postService, categoryService } from '../../services/api';
import { queryKeys } from '../../constants/queryKeys';
import { Loading } from '../../components/common/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { getErrorMessage } from '../../utils/errorHandler';
import { PostCard } from '../../components/posts/PostCard';
import { SearchInput } from '../../components/common/SearchInput';
import './Home.css';

export function CategoryPosts() {
  const { slug } = useParams<{ slug: string }>();

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: postService.getAll,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryService.getAll,
  });

  const isLoading = postsLoading || categoriesLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (postsError) {
    return <ErrorMessage message={`Erro ao carregar posts: ${getErrorMessage(postsError)}`} />;
  }

  const category = categories?.find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div className="home-modern">
        <div className="home-modern-content">
          <ErrorMessage message="Categoria não encontrada" />
          <Link to="/categorias" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Voltar para Categorias
          </Link>
        </div>
      </div>
    );
  }

  const filteredPosts = posts?.filter(post =>
    post.status === 'PUBLISHED' && post.category?.id === category.id
  ) || [];

  return (
    <div className="home-modern">
      <div className="home-modern-header">
        <SearchInput />
      </div>

      <section className="home-modern-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/categorias" className="btn btn-secondary btn-sm">
            ← Voltar para Categorias
          </Link>
        </div>

        <h2 className="home-modern-title">Posts em {category.name}</h2>

        {filteredPosts.length === 0 ? (
          <div className="home-modern-empty">
            <p>Nenhum post publicado nesta categoria ainda.</p>
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

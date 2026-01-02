import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>abandonedcode</h1>
        </div>

        <nav className="header-nav">
          <Link to="/admin" className="header-link">Posts</Link>
          <Link to="/admin/categories" className="header-link">Categorias</Link>
          <Link to="/" className="btn btn-secondary btn-sm">
            Ver Site
          </Link>
          <Link to="/admin/posts/new" className="btn btn-primary btn-sm">
            Novo Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

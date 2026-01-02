import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>AbandonedCode</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="header-link">Posts</Link>
          <Link to="/categories" className="header-link">Categorias</Link>
          <Link to="/posts/new" className="btn btn-primary btn-sm">
            Novo Post
          </Link>
        </nav>
      </div>
    </header>
  );
}

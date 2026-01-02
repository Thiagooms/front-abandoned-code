import { Link } from 'react-router-dom';
import './Header.css';

export function PublicHeader() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>AbandonedCode</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="header-link">Posts</Link>
        </nav>
      </div>
    </header>
  );
}

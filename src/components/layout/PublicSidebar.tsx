import { NavLink } from 'react-router-dom';
import { HomeIcon, FolderIcon, GitHubIcon, LinkedInIcon } from '../common/Icons';
import './PublicSidebar.css';

export function PublicSidebar() {
  return (
    <aside className="public-sidebar-modern">
      <div className="sidebar-logo">
        <h1>abandonedcode</h1>
      </div>

      <nav className="sidebar-nav-modern">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
        >
          <HomeIcon className="sidebar-nav-item-icon" />
          <span>HOME</span>
        </NavLink>

        <NavLink
          to="/categorias"
          end
          className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
        >
          <FolderIcon className="sidebar-nav-item-icon" />
          <span>CATEGORIAS</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <a
          href="https://github.com/Thiagooms"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-social-link"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/thiago-monteiro-4531b4234/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-social-link"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>
    </aside>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryResponse } from '../../types/api';
import './CategoryAccordion.css';

interface CategoryTreeNode extends CategoryResponse {
  children: CategoryTreeNode[];
}

interface CategoryAccordionProps {
  category: CategoryTreeNode;
}

export function CategoryAccordion({ category }: CategoryAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = category.children.length > 0;

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="category-accordion">
      <div className="category-accordion-header">
        <Link to={`/categories/${category.slug}`} className="category-accordion-title">
          <span className="category-accordion-name">{category.name}</span>
          {category.fullPath && category.fullPath !== category.name && (
            <span className="category-accordion-path">{category.fullPath}</span>
          )}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={handleToggle}
            className="category-accordion-toggle"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Fechar subcategorias' : 'Abrir subcategorias'}
          >
            <svg
              className={`category-accordion-icon ${isExpanded ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={`category-accordion-content ${isExpanded ? 'expanded' : ''}`}
        >
          <div className="category-accordion-children">
            {category.children.map(child => (
              <CategoryAccordion key={child.id} category={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

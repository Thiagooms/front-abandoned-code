import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryResponse } from '../../types/api';
import { ChevronRightIcon, ChevronDownIcon } from '../common/Icons';
import './CategoryCard.css';

interface CategoryCardProps {
  category: CategoryResponse;
  children?: CategoryResponse[];
}

export function CategoryCard({ category, children }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && children.length > 0;
  const categoryPath = `/categories/${category.slug}`;

  if (!hasChildren) {
    return (
      <div className="category-card-modern">
        <div className="category-card-simple">
          <Link to={categoryPath} className="category-name-link">
            <h3 className="category-card-modern-title">{category.name}</h3>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-card-modern">
      <button
        className="category-card-dropdown-button"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <Link
          to={categoryPath}
          className="category-name-link"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="category-card-modern-title">{category.name}</h3>
        </Link>
        {isExpanded ? (
          <ChevronDownIcon className="category-chevron" />
        ) : (
          <ChevronRightIcon className="category-chevron" />
        )}
      </button>

      {isExpanded && (
        <div className="category-subcategories">
          {children.map((subcategory) => (
            <Link
              key={subcategory.id}
              to={`/categories/${subcategory.slug}`}
              className="category-subcategory-link"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

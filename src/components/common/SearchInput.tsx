import { SearchIcon } from './Icons';
import type { ChangeEvent } from 'react';

interface SearchInputProps {
  placeholder?: string;
  searchTerm?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ placeholder = "buscar...", searchTerm, onSearchChange }: SearchInputProps) {
  return (
    <div className="search-container">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}

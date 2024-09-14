import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchField: React.FC<SearchInputProps> = ({ placeholder = 'Поиск...', onSearch, className }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`input-group ${className}`}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-dark" onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default SearchField;

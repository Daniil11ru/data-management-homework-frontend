import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, SxProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  sx?: SxProps;
}

const SearchField: React.FC<SearchFieldProps> = ({ placeholder = 'Поиск...', onSearch, className, sx }) => {
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
    <TextField
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      value={query}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      className={className}
      sx={sx} // Передаем свойство sx в компонент TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;

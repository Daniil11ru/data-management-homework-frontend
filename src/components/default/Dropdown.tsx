import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Компонент выпадающего списка
const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder = 'Выберите...', className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select className={`form-select ${className}`} onChange={handleChange}>
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

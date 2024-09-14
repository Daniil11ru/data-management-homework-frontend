import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, SxProps } from '@mui/material';

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  sx?: SxProps;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, defaultValue, placeholder = 'Выберите...', className, sx }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue === undefined ? '' : defaultValue);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <FormControl variant="outlined" className={className} fullWidth>
      <InputLabel>{placeholder}</InputLabel>
      <Select value={selectedValue} onChange={handleChange} label={placeholder} sx={sx}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;

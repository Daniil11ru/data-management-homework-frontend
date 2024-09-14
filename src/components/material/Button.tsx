import * as React from 'react';
import { Button as MaterialButton } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  className,
}) => {
  return (
    <MaterialButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      className={className}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
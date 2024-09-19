import * as React from 'react';
import { Button as MaterialButton } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  onClickCapture?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  onClickCapture, // Добавляем onClickCapture в пропсы
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
      onClickCapture={onClickCapture} // Передаем onClickCapture в компонент
      className={className}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;

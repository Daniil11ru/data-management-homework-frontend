import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', className }) => {
  return (
    <button onClick={onClick} className={`btn btn-${variant} ${className}`}>
      {label}
    </button>
  );
};

export default Button;


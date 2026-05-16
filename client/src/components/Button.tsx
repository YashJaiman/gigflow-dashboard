import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const baseClass =
    'px-4 py-2 rounded font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClass} ${variantClass} ${className || ''}`}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

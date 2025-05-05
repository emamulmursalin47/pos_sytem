import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({
  children,
  className,
  padding = 'md',
  radius = 'md',
  shadow = 'md',
  border = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={clsx(
        'bg-white',
        paddingClasses[padding],
        radiusClasses[radius],
        shadowClasses[shadow],
        border && 'border border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className, actions }) => (
  <div className={clsx('flex justify-between items-center mb-4', className)}>
    <div>{children}</div>
    {actions && <div>{actions}</div>}
  </div>
);

Card.Body = ({ children, className }) => (
  <div className={className}>{children}</div>
);

Card.Footer = ({ children, className }) => (
  <div className={clsx('mt-4 pt-3 border-t border-gray-200', className)}>
    {children}
  </div>
);

export default Card;
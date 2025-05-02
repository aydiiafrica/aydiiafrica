import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'white'
    | 'secondary-alt'
    | 'white-alt';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
}

const variantStyles = {
  primary:
    'border border-primary text-primary hover:text-white hover:bg-primary',
  secondary: 'text-secondary hover:text-white hover:bg-secondary',
  'secondary-alt':
    'bg-secondary text-white hover:bg-secondary-200 hover:bg-secondary',

  white: 'border border-white text-white hover:text-primary hover:bg-white',
  'white-alt': 'bg-white text-black hover:bg-gray-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-50',
};

const sizeStyles = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      href,
      isExternal = false,
      ...props
    },
    ref
  ) => {
    const classes = `flex items-center gap-4 rounded-sm transition-all duration-300 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      const linkProps = isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
      return (
        <Link href={href} {...linkProps} className={classes}>
          {props.children}
        </Link>
      );
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = 'Button';

export default Button;

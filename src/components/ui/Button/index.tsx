import { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}

/**
 * Button Component
 * Netflix-style button with multiple variants and states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      children,
      onClick,
      type = 'button',
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseClass = styles.button;
    const variantClass = styles[`button--${variant}`];
    const sizeClass = styles[`button--${size}`];
    const loadingClass = loading ? styles['button--loading'] : '';
    const disabledClass = disabled ? styles['button--disabled'] : '';

    const buttonClasses = [
      baseClass,
      variantClass,
      sizeClass,
      loadingClass,
      disabledClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        {...props}
      >
        {loading && (
          <svg
            className={styles.spinner}
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeDasharray='31.416'
              strokeDashoffset='31.416'
            />
          </svg>
        )}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

import { forwardRef, useState } from 'react';
import styles from './Input.module.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  id?: string;
}

/**
 * Input Component
 * Netflix-style input with validation states and accessibility
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      error,
      disabled = false,
      required = false,
      className = '',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const inputValue = value !== undefined ? value : internalValue;

    const baseClass = styles.input;
    const focusedClass = isFocused ? styles['input--focused'] : '';
    const errorClass = error ? styles['input--error'] : '';
    const disabledClass = disabled ? styles['input--disabled'] : '';
    const searchClass = type === 'search' ? styles['input--search'] : '';

    const inputClasses = [
      baseClass,
      focusedClass,
      errorClass,
      disabledClass,
      searchClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleFocus = (_e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.();
    };

    const errorId = error ? `${props.id || 'input'}-error` : undefined;

    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          {type === 'search' && (
            <svg
              className={styles.searchIcon}
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
          <input
            ref={ref}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-label={ariaLabel}
            aria-describedby={errorId || ariaDescribedby}
            aria-invalid={!!error}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            {...props}
          />
        </div>
        {error && (
          <div id={errorId} className={styles.error} role='alert'>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

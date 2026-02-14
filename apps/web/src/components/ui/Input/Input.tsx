import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClasses = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
      error && styles.hasError,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>

        {error && <span className={styles.error}>{error}</span>}
        {!error && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

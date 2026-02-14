import { ReactNode } from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  );
}

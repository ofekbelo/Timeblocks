import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
}

export function Spinner({ size = 'md', color = 'primary' }: SpinnerProps) {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />
  );
}

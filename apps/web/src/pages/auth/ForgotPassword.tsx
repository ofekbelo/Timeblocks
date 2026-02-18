import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './Auth.module.scss';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <div className={styles.success}>
            <div className={styles.icon}>📧</div>
            <h1>Check Your Email</h1>
            <p className={styles.message}>
              If an account exists with that email, we've sent a password reset link.
            </p>
            <p className={styles.subtitle}>
              Check your spam folder if you don't see it.
            </p>
            <Link to="/auth/login">
              <Button variant="primary" fullWidth>
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Forgot Password?</h1>
        <p className={styles.subtitle}>
          Enter your email and we'll send you a reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              fullWidth
              autoFocus
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>

          <p className={styles.link}>
            Remember your password? <Link to="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

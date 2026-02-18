import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { Button } from '@/components/ui/Button';
import styles from './Auth.module.scss';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/verify-email?token=${token}`
      );

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setStatus('success');
      setMessage('Email verified successfully!');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Verification failed. The link may have expired.');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Email Verification</h1>

        {status === 'verifying' && (
          <div className={styles.verifying}>
            <Spinner size="lg" />
            <p>Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.success}>
            <div className={styles.icon}>✓</div>
            <p className={styles.message}>{message}</p>
            <p className={styles.subtitle}>Redirecting to login...</p>
            <Button
              variant="primary"
              onClick={() => navigate('/auth/login')}
            >
              Go to Login
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.error}>
            <div className={styles.icon}>✕</div>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
              <Link to="/auth/login">
                <Button variant="primary">Back to Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

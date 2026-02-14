import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './Auth.module.scss';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Login to TimeBlocks</h1>
        <p className={styles.subtitle}>Track your time, manage your projects</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            Login
          </Button>

          <p className={styles.link}>
            Don't have an account? <a href="/auth/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

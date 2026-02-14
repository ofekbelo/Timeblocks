import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './Auth.module.scss';

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await register({ email, password, fullName }).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (err: any) {
      setError(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Start tracking your time today</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoFocus
            fullWidth
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            fullWidth
            helperText="At least 8 characters with uppercase, lowercase, and number"
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            Register
          </Button>

          <p className={styles.link}>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

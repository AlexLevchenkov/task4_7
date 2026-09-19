import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/userProfile.reducer';
import { firebaseAuth } from '../../firebase';

const AuthPage = ({ mode }: { mode: 'signin' | 'signup' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            id: Number.parseInt(user.uid.slice(0, 8), 16) || 0,
            userName: user.email?.split('@')[0] || 'User',
            userLogo: null,
          }),
        );
        navigate('/calendar');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        await firebaseAuth.signUp(email, password);
      } else {
        await firebaseAuth.signIn(email, password);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          style={{ padding: 10 }}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          minLength={6}
          style={{ padding: 10 }}
        />
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
        <button
          type="button"
          onClick={() => navigate(mode === 'signup' ? '/signin' : '/signup')}
          style={{ padding: 10 }}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;

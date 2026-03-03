import { useState } from 'react';
import { useAuth } from './Auth';

export default function LoginScreen() {
    const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (mode === 'login') {
                await loginWithEmail(email, password);
            } else {
                await registerWithEmail(email, password);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

      return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 border" style={{ width: '100%', maxWidth: 420 }}>

        {/* Branding */}
        <div className="text-center mb-4">
          <div className="fs-1">🌿</div>
          <h1 className="text-success bungee-regular fs-3 mb-0">Save the City</h1>
          <p className="text-muted small text-uppercase">Seattle Community Gardens</p>
        </div>

        {/* Tabs */}
        <ul className="nav nav-pills nav-fill mb-4">
        <li className="nav-item">
            <button
            className={`nav-link ${mode === 'login' ? 'active' : 'text-secondary'}`}
            onClick={() => { setMode('login'); setError(''); }}
            >
            Sign In
            </button>
        </li>
        <li className="nav-item">
            <button
            className={`nav-link ${mode === 'register' ? 'active' : 'text-secondary'}`}
            onClick={() => { setMode('register'); setError(''); }}
            >
            Create Account
            </button>
        </li>
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-success small fw-bold text-uppercase">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-success small fw-bold text-uppercase">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder={mode === 'register' ? 'At least 6 characters' : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <button className="btn btn-success w-100 fw-bold mt-1" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center gap-2 my-3 text-muted small">
          <hr className="flex-grow-1 m-0" />
          <span>or</span>
          <hr className="flex-grow-1 m-0" />
        </div>

        {/* Google */}
        <button className="btn btn-outline-secondary w-100" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>

      </div>
    </div>
  );
}
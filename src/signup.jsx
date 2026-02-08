import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const navigate = useNavigate();

  const handleInitialSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setShowQuestionnaire(true);
    setError('');
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();

    if (!userType) {
      return setError('Please select how you will use the application');
    }

    try {
      setError('');
      setLoading(true);

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile to database
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        userType: userType,
        questionnaireCompleted: true,
        createdAt: new Date().toISOString()
      });

      // Navigate to appropriate dashboard based on user type
      if (userType === 'host') {
        navigate('/host-dashboard');
      } else if (userType === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else if (userType === 'consumer') {
        navigate('/consumer-dashboard');
      }

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Failed to create account. Please try again.');
      }
      setLoading(false);
    }
  };

  // Step 1: Email and Password
  if (!showQuestionnaire) {
    return (
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h1 className="h3 fw-bold mb-2">Create Account</h1>
                    <p className="text-muted">Join Save the City today</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleInitialSignup}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                      <div className="form-text">Must be at least 6 characters</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2 fw-semibold"
                    >
                      Continue
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{' '}
                      <a href="/login" className="fw-semibold text-decoration-none">
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Questionnaire
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">Welcome! 👋</h1>
                  <p className="text-muted">Tell us how you'll be using Save the City</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleCompleteSignup}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold fs-5 mb-3">
                      How will you be using Save the City?
                    </label>

                    <div className="mb-3">
                      <div 
                        className={`card ${userType === 'host' ? 'border-primary border-2 bg-light' : ''}`}
                        onClick={() => setUserType('host')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="userType"
                              id="host"
                              value="host"
                              checked={userType === 'host'}
                              onChange={(e) => setUserType(e.target.value)}
                            />
                            <label className="form-check-label w-100" htmlFor="host">
                              <div className="fw-semibold fs-6 mb-1">🌱 Garden Host</div>
                              <div className="text-muted small">I manage or host a community garden</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div 
                        className={`card ${userType === 'volunteer' ? 'border-primary border-2 bg-light' : ''}`}
                        onClick={() => setUserType('volunteer')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="userType"
                              id="volunteer"
                              value="volunteer"
                              checked={userType === 'volunteer'}
                              onChange={(e) => setUserType(e.target.value)}
                            />
                            <label className="form-check-label w-100" htmlFor="volunteer">
                              <div className="fw-semibold fs-6 mb-1">🤝 Garden Volunteer</div>
                              <div className="text-muted small">I want to help out at community gardens</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div 
                        className={`card ${userType === 'consumer' ? 'border-primary border-2 bg-light' : ''}`}
                        onClick={() => setUserType('consumer')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="userType"
                              id="consumer"
                              value="consumer"
                              checked={userType === 'consumer'}
                              onChange={(e) => setUserType(e.target.value)}
                            />
                            <label className="form-check-label w-100" htmlFor="consumer">
                              <div className="fw-semibold fs-6 mb-1">🥕 Garden Consumer</div>
                              <div className="text-muted small">I want to visit and use community gardens</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading || !userType}
                  >
                    {loading ? 'Creating Account...' : 'Complete Sign Up'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
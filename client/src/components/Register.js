import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [missingValues, setMissingValues] = useState(false);

  function handleGoToSigninClick() {
    navigate('/login');
  }

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (username && password && confirmPassword) {
      setMissingValues(false);
    }
  }, [username, password, confirmPassword]);

  function handleRegisterClick(e) {
    e.preventDefault();
    if (username === '' || password === '' || confirmPassword === '') {
      setMissingValues(true);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form">
        <p>Signup</p>
        <div className="auth-form-row">
          {!passwordsMatch ? (
            <p className="auth-message">Passwords do not match</p>
          ) : null}
          {missingValues ? (
            <p className="auth-message">Please fill in all fields</p>
          ) : null}
        </div>
        <div className="auth-form-row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="auth-form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-form-row">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button onClick={handleRegisterClick} disabled={!passwordsMatch}>
          Register
        </button>
        <p>
          Already registered? Sign in{' '}
          <span onClick={handleGoToSigninClick}>here</span>!
        </p>
      </form>
      <p className="photo-credit">
        Photo by Sébastien Marchand on{' '}
        <a href="https://unsplash.com/photos/oVIUvwm2dvM">Unsplash</a>
      </p>
    </div>
  );
};

export default Register;

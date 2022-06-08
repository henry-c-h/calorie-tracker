import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserAsync } from '../features/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [missingValues, setMissingValues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleGoToSigninClick() {
    navigate('/login');
  }

  useEffect(() => {
    if (password !== confirmPassword && password && confirmPassword) {
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

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (username === '' || password === '' || confirmPassword === '') {
      setMissingValues(true);
    } else {
      try {
        const registerData = {
          username,
          password,
        };
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerData),
        });
        if (response.status === 400) {
          const data = await response.json();
          setErrorMessage(data.errorMessage);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        } else if (response.status === 200) {
          dispatch(fetchUserAsync()).then(() => navigate('/'));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegisterSubmit}>
        <p>Signup</p>
        <div className="auth-form-row">
          {!passwordsMatch ? (
            <p className="auth-message">Passwords do not match</p>
          ) : null}
          {missingValues ? (
            <p className="auth-message">Please fill in all fields</p>
          ) : null}
          {password.length < 6 && password !== '' ? (
            <p className="auth-message">
              Passwords must be longer than 6 characters
            </p>
          ) : null}
          {errorMessage ? <p className="auth-message">{errorMessage}</p> : null}
        </div>
        <div className="auth-form-row">
          <label htmlFor="username">Username*</label>
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
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-form-row">
          <label htmlFor="confirm-password">Confirm Password*</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button disabled={!passwordsMatch}>Register</button>
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

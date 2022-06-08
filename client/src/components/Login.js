import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserAsync } from '../features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingValues, setMissingValues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleGoToRegisterClick() {
    navigate('/register');
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    setErrorMessage('');
  }

  function handlePasswordeChange(e) {
    setPassword(e.target.value);
    setErrorMessage('');
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (username === '' || password === '') {
      setMissingValues(true);
    } else {
      try {
        const loginData = {
          username,
          password,
        };
        const response = await fetch(
          'https://calorie-logging-app.herokuapp.com/api/auth/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          }
        );
        if (response.status === 401) {
          const data = await response.json();
          setErrorMessage(data.errorMessage);
          setUsername('');
          setPassword('');
        } else if (response.status === 200) {
          dispatch(fetchUserAsync()).then(() => navigate('/'));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    if (username && password) {
      setMissingValues(false);
    }
  }, [username, password]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLoginSubmit}>
        <p>Login</p>
        <div className="auth-form-row">
          {missingValues ? (
            <p className="auth-message">Please fill in both fields</p>
          ) : null}
          {errorMessage ? <p className="auth-message">{errorMessage}</p> : null}
        </div>
        <div className="auth-form-row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            autoComplete="off"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="auth-form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordeChange}
          />
        </div>
        <button>Login</button>
        <p>
          New here? Register <span onClick={handleGoToRegisterClick}>here</span>
          !
        </p>
      </form>
      <p className="photo-credit">
        Photo by Sébastien Marchand on{' '}
        <a href="https://unsplash.com/photos/oVIUvwm2dvM">Unsplash</a>
      </p>
    </div>
  );
};

export default Login;

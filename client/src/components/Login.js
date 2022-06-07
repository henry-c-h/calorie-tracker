import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingValues, setMissingValues] = useState(false);

  function handleGoToRegisterClick() {
    navigate('/register');
  }

  function handleLoginClick(e) {
    e.preventDefault();
    if (username === '' || password === '') {
      setMissingValues(true);
    }
  }

  useEffect(() => {
    if (username && password) {
      setMissingValues(false);
    }
  }, [username, password]);

  return (
    <div className="auth-container">
      <form className="auth-form">
        <p>Login</p>
        <div className="auth-form-row">
          {missingValues ? (
            <p className="auth-message">Please fill in both fields</p>
          ) : null}
        </div>
        <div className="auth-form-row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            autoComplete="off"
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
        <button onClick={handleLoginClick}>Login</button>
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

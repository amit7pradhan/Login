import { useState, useEffect } from 'react';
import logo from "./images/logo.png"

function App() {
  const [isOTP, setIsOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const getPasswordErrors = (password) => {
    const errors = [];
    if (password.length === 0) return ['Password must contain at least 8 characters, one capital letter, one symbol (@$!%*?&), and one number'];
    
    if (password.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('one capital letter');
    if (!/[@$!%*?&]/.test(password)) errors.push('one symbol (@$!%*?&)');
    if (!/[0-9]/.test(password)) errors.push('one number');
    
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setShowMessage(false);

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    const passwordErrors = getPasswordErrors(password);
    if (passwordErrors.length > 0) {
      setPasswordError(`Password must contain: ${passwordErrors.join(', ')}`);
      return;
    }
    
    showSuccessMessage('Login successful!');
    resetForm();
  };

  const handleOTP = (e) => {
    e.preventDefault();
    setMessage('');
    setShowMessage(false);

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    showSuccessMessage('OTP sent successfully!');
    resetForm();
  };

  const showSuccessMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Login</h1>

      <div className="toggle-container">
        <label>
          <input
            type="radio"
            name="loginType"
            checked={!isOTP}
            onChange={() => setIsOTP(false)}
          />
          Login Using Email/Password
        </label>
        <label>
          <input
            type="radio"
            name="loginType"
            checked={isOTP}
            onChange={() => setIsOTP(true)}
          />
          Login with OTP
        </label>
      </div>

      <form onSubmit={isOTP ? handleOTP : handleLogin}>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>

        {!isOTP && (
          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>
        )}

        {isOTP && (
          <div className="resend-container">
            <button
              type="button"
              className="resend-btn"
              onClick={handleOTP}
            >
              Resend OTP
            </button>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isOTP ? 'Send OTP' : 'Login'}
        </button>
      </form>

      <div className={`success-message ${showMessage ? 'show' : ''}`}>
        {message}
      </div>
    </div>
  );
}

export default App;
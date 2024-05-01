import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const users = [
    { email: 'galaxyaagraphics@gmail.com', password: 'layyah', username: 'ali' },
    { email: 'asiflayyah1@gmail.com', password: 'layyah', username: 'asif' },
    { email: 'khangee436283@gmail.com', password: 'layyah12', username: 'khan' }
  ];

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', username: '', password: '' };

    if (!email) {
      newErrors.email = 'Please enter email';
      valid = false;
    }

    if (!username) {
      newErrors.username = 'Please enter username';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Please enter password';
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('Authentication successful');
        setAuthenticated(true);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail('');
          setUsername('');
          setPassword('');
          setAuthenticated(false);
        }, 2000);
      } else {
        console.log('Authentication failed');
        setSubmitted(true);
        setErrors({ email: 'Invalid email or password', username: '', password: '' });
        window.alert('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="Login-page">
      <header className="header">
        <h1>LogIn</h1>
        <p>Welcome back! Log in to continue.</p>
      </header>
      <section className="content">
        <Card className="card" title="Log In">
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
              </span>
              {submitted && errors.email && <small className="p-error">{errors.email}</small>}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="username">Username</label>
              </span>
              {submitted && errors.username && <small className="p-error">{errors.username}</small>}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
              </span>
              {submitted && errors.password && <small className="p-error">{errors.password}</small>}
            </div>
            <Button label="Log In" className="p-button-raised p-button-primary" />
            {submitted && authenticated && <div className="success-message">Successfully submitted</div>}
            {submitted && !authenticated && <div className="error-message">Authentication failed</div>}
          </form>
        </Card>
      </section>
    </div>
  );
};

export default Signin;

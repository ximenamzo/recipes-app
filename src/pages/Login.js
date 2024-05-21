import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  return (
    <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <p>Ingresa tus credenciales para acceder al panel de administración.</p>
        <form onSubmit={handleLogin} className="login-form">
            <label>Usuario:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
  );
}

export default Login;

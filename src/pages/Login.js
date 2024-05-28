import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser, validatePassword } from '../services/middleware';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(validateUser(username) && validatePassword(password)){
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/dashboard');
        } else {
          alert(data.message); // Muestra el mensaje de error del servidor
        }
      } catch (error) {
        console.error('Error en el login:', error);
        alert('Error al iniciar sesión');
      }
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

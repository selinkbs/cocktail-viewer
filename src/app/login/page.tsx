// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const dummyUser = {
  username: 'dummyuser',
  password: 'password123',
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === dummyUser.username && password === dummyUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/'; // Oturum açma işlemi tamamlandığında kullanıcıyı yönlendiriyoruz
    } else {
      setError('Invalid username or password');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress} // Enter tuşuna basıldığında handleLogin fonksiyonunu çağır
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress} // Enter tuşuna basıldığında handleLogin fonksiyonunu çağır
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

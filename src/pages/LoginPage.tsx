import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === 'superadmin@kotlagymkhana.com' && password === 'pak786') {
      setError('');
      onLoginSuccess?.();
      navigate('/superadmin/dashboard');
    } else if (email === 'admin@kotlagymkhana.com' && password === 'pak786') {
      setError('');
      onLoginSuccess?.();
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f6faff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Sign in to Kotla Gym Khana CRM
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your credentials to access the dashboard
        </p>
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full px-4 py-2 rounded-md bg-[#f6faff] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition text-black"
            placeholder="admin@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full px-4 py-2 rounded-md bg-[#f6faff] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition text-black"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors text-base mt-2 shadow-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
} 
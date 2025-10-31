import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, {
        username,
        password
      });

      // Store token in localStorage
      localStorage.setItem('adminToken', response.data.access_token);
      localStorage.setItem('adminUsername', username);

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/images/circle-logo.jpg" 
            alt="TC Pro Dojo" 
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold text-white torture-text mb-2">ADMIN LOGIN</h1>
          <p className="text-gray-400">TC Pro Dojo Management</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900 border border-blue-500/20 rounded-lg p-8">
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-blue-500/20 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                  data-testid="admin-username"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black border border-blue-500/20 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter password"
                  data-testid="admin-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="admin-login-button"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Default credentials:</p>
            <p className="text-gray-400 mt-1">Username: admin | Password: tcprodojo2025</p>
            <p className="text-gray-400">Username: rodney | Password: tcprodojo2025</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

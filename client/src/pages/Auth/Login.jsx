import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success('Welcome!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-primary to-blue-400 p-5">
      <div className="bg-white rounded-xl p-10 w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-primary">ProCV UAE</h1>
          <span className="text-xs text-gray-400">Smart CV Builder for UAE Job Market</span>
        </div>

        <h2 className="text-xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Sign in to your account</p>

        <button
          className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          onClick={handleGoogle}
          type="button"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5 text-gray-400 text-xs">
          <span className="flex-1 h-px bg-gray-200" />
          or
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold text-base hover:bg-primary-dark transition disabled:opacity-60 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

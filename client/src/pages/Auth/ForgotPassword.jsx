import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      toast.error(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-primary to-blue-400 p-5">
      <div className="bg-white rounded-xl p-10 w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-primary">ProCV UAE</h1>
          <span className="text-xs text-gray-400">Smart CV Builder for UAE Job Market</span>
        </div>

        <h2 className="text-xl font-bold text-center mb-1">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          {sent ? 'Check your email for reset instructions' : 'Enter your email to receive a reset link'}
        </p>

        {!sent && (
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
            <button
              className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold text-base hover:bg-primary-dark transition disabled:opacity-60 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="text-center mt-5 text-sm text-gray-500">
          <Link to="/login" className="text-primary hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}

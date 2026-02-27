import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Registration successful, navigate to login
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👥</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join our marketplace community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input 
              name="username" 
              type="text"
              onChange={handleChange} 
              value={form.username}
              placeholder="Choose a username" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              name="email" 
              type="email"
              onChange={handleChange} 
              value={form.email}
              placeholder="Enter your email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              onChange={handleChange} 
              value={form.password}
              placeholder="Create a password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
              required
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200"
            >
              {error}
            </motion.div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-600">
          <p>Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Login</a></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;

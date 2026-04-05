import { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Registration Failed: " + error.message);
    else {
      alert("Registration Successful! Please check your email or login.");
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8">Sign up to start organizing your tasks.</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
              placeholder="you@company.com" 
              onChange={e => setEmail(e.target.value)} 
              data-testid="reg-email" 
              required 
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
              placeholder="Minimal 6 characters" 
              onChange={e => setPassword(e.target.value)} 
              data-testid="reg-password" 
              required 
              minLength={6}
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            data-testid="reg-submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>
        <p className="mt-8 text-center text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
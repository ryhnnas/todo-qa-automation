import { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8">Please enter your details to sign in.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="name@company.com" 
              onChange={e => setEmail(e.target.value)} 
              data-testid="login-email" required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••" 
              onChange={e => setPassword(e.target.value)} 
              data-testid="login-password" required 
            />
          </div>
          <button type="submit" data-testid="login-submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-slate-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
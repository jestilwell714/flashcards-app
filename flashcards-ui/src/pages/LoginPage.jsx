import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../config";

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

 const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/auth/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        }
        throw new Error("Login failed");
    })
    .then(data => {
        
        localStorage.setItem('token', data.token);
        navigate('/explorer/preview/root/0');
    })
    .catch(() => {
        alert("Login failed. Username or Password incorrect");
    });
};

    return (
        <div className="grad h-dvh w-screen flex items-center justify-center p-4">
            <div className="bg-white/20 border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                <form onSubmit={handleLogin} className="items-center flex flex-col space-y-4">
                    <input 
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="username" placeholder="User" required
                        onChange={e => setFormData({...formData, username: e.target.value})} 
                    />
                    <input 
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password" placeholder="Password" required
                        onChange={e => setFormData({...formData, password: e.target.value})} 
                    />
                    <button type="submit" className="px-10 py-3 text-white font-black uppercase tracking-widest rounded-full
                   transition-all duration-100 active:scale-95 bg-linear-to-br from-amber-400 to-orange-500 hover:to-orange-600 hover:scale-105 shadow-lg shadow-black/30">
                        Sign In
                    </button>
                </form>
                <p className="text-white/70 text-center mt-6">
                    Need an account? <Link to="/register" className="!text-amber-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../config";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', username: '', password: ''
    });
    const navigate = useNavigate();

   const handleRegister = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json(); 
    })
    .then((data) => {
        localStorage.setItem('token', data.token); 
        navigate('/explorer/preview/root/0');
    })
    .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration failed. Email might already be in use.");
    });
};

    return (
        <div className="grad h-dvh w-screen flex items-center justify-center p-4">
            <div className="bg-white/20 border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-3 flex flex-col items-center">
                    <div className="grid grid-cols-2 gap-3">
                        <input className="p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                            placeholder="First Name" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                        <input className="p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                            placeholder="Last Name" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <input className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                        type="username" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} />
                    <input className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50"
                        type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
                    
                    <button type="submit" className="px-10 py-3 text-white font-black uppercase tracking-widest rounded-full
                   transition-all duration-100 active:scale-95 bg-linear-to-br from-amber-400 to-orange-500 hover:to-orange-600 hover:scale-105 shadow-lg shadow-black/30">
                        Join Now
                    </button>
                </form>
                <p className="text-white/70 text-center mt-6">
                    Already have an account? <Link to="/login" className="!text-amber-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
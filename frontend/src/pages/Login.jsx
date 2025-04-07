import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Footer, Navbar } from "../components";
import { apiRequest } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await apiRequest('/login.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify({
                    email: formData.email,
                    fullName: data.fullName
                }));
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Error during login');
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Login</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="mb-2">Email address</label>
                                <input
                                    type="email"
                                    className="form-control mb-4"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="mb-2">Password</label>
                                <input
                                    type="password"
                                    className="form-control mb-4"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>Don't have an account? <Link to="/register" className="text-decoration-underline text-dark">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;


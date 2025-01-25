import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(''); // State to store error messages
    const { username, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(user);
            const res = await axios.post('https://sutex-backend.onrender.com/api/auth/login/', body, config);

            console.log('API Response:', res);

            if (res && res.data) {
                console.log('Response Data:', res.data);
                // Save the token to localStorage
                localStorage.setItem('token', res.data.token);
                // Redirect to home page after successful login
                navigate('/home');
            }
        } catch (err) {
            console.error('API Error:', err);

            if (err.response && err.response.data) {
                if (err.response.data.non_field_errors) {
                    setError('Invalid username or password.');
                } else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
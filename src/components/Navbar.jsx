import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Sun, Moon, MoreVertical } from 'lucide-react';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.body.classList.add('light-mode');
        }

        if (localStorage.getItem('isAdmin') === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminId === '@neuronex' && adminPass === '11111208524') {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
            setIsMenuOpen(false);
            setError('');
            setAdminId('');
            setAdminPass('');
        } else {
            setError('Incorrect Admin ID or Password');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar" style={{ padding: '1rem 3rem', justifyContent: 'center', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <NavLink to="/" className="nav-brand" style={{ position: 'absolute', left: '3rem' }}>
                <Heart fill="var(--primary)" color="var(--primary)" size={32} className="animate-heartbeat" />
                <span className="text-gradient">Love</span>
            </NavLink>

            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Home
                </NavLink>
                <NavLink to="/quotes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Quotes
                </NavLink>
                <NavLink to="/poetry" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Poetry
                </NavLink>
                <NavLink to="/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Quiz
                </NavLink>
                {isAdmin && (
                    <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        History
                    </NavLink>
                )}
            </div>

            <div style={{ position: 'absolute', right: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: isDarkMode ? 'var(--secondary)' : 'var(--primary)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'background 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <MoreVertical size={24} />
                    </button>

                    {isMenuOpen && (
                        <div className="glass-panel" style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '260px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            zIndex: 100,
                        }}>
                            {!isAdmin ? (
                                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.2rem', textAlign: 'center' }}>Admin Login</h4>
                                    <input
                                        type="text"
                                        placeholder="Admin ID"
                                        className="input-glass"
                                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                                        value={adminId}
                                        onChange={(e) => setAdminId(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input-glass"
                                        style={{ padding: '10px 14px', fontSize: '0.9rem' }}
                                        value={adminPass}
                                        onChange={(e) => setAdminPass(e.target.value)}
                                        required
                                    />
                                    {error && <div style={{ color: '#ff4444', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
                                    <button type="submit" className="btn-primary" style={{ padding: '10px 16px', fontSize: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                                        Login
                                    </button>
                                </form>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                                    <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>Welcome, Admin</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>You now have access to History.</p>
                                    <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', justifyContent: 'center', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', boxShadow: 'none' }}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav >
    );
};

export default Navbar;

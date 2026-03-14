import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Trash2, Calendar, Search } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('loveHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear your entire match history?")) {
            localStorage.removeItem('loveHistory');
            setHistory([]);
        }
    };

    const removeEntry = (id) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        localStorage.setItem('loveHistory', JSON.stringify(newHistory));
    };

    const filteredHistory = history.filter(item =>
        item.name1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name2.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <HistoryIcon size={40} color="var(--primary)" />
                <span className="text-gradient">Match History</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Your past compatibility calculations.
            </p>

            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: '1 1 250px' }}>
                        <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            className="input-glass"
                            placeholder="Search names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '45px' }}
                        />
                    </div>
                    <button
                        onClick={clearHistory}
                        className="btn-primary"
                        style={{ background: 'rgba(255, 64, 129, 0.2)', border: '1px solid rgba(255, 64, 129, 0.5)', color: '#ff4081', padding: '10px 20px', fontSize: '1rem' }}
                        disabled={history.length === 0}
                    >
                        <Trash2 size={18} /> Clear All
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                    {filteredHistory.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', padding: '3rem' }}>
                            <HistoryIcon size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>No history found. Go calculate some love!</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredHistory.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '12px',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                background: `conic-gradient(var(--primary) ${item.percentage}%, var(--glass-bg) 0)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative'
                                            }}>
                                                <div style={{ position: 'absolute', width: '45px', height: '45px', background: 'var(--bg-dark)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
                                                    {item.percentage}%
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                    <span style={{ color: 'var(--primary)' }}>{item.name1}</span>
                                                    <span style={{ color: 'var(--text-muted)', margin: '0 10px' }}>&</span>
                                                    <span style={{ color: 'var(--secondary)' }}>{item.name2}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <Calendar size={14} /> {item.date}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeEntry(item.id)}
                                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.6, transition: 'all 0.2s ease' }}
                                            onMouseOver={(e) => { e.currentTarget.style.color = '#ff4081'; e.currentTarget.style.opacity = '1'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.opacity = '0.6'; }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;

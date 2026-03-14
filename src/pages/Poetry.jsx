import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Heart, Send, UserCircle2, Type } from 'lucide-react';

const Poetry = () => {
    const [poems, setPoems] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');

    // Load poems and fade out those older than 1 week
    useEffect(() => {
        const savedPoems = JSON.parse(localStorage.getItem('community_poetry_v2') || '[]');
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        const validPoems = savedPoems.filter(poem => (now - poem.timestamp) < oneWeekInMs);

        if (savedPoems.length !== validPoems.length) {
            localStorage.setItem('community_poetry_v2', JSON.stringify(validPoems));
        }

        setPoems(validPoems);
    }, []);

    const handlePost = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newText.trim()) return;

        const newPoem = {
            id: Date.now(),
            title: newTitle,
            text: newText,
            likes: 0,
            timestamp: Date.now(),
            dateString: new Date().toLocaleDateString()
        };

        const updatedPoems = [newPoem, ...poems];
        setPoems(updatedPoems);
        localStorage.setItem('community_poetry_v2', JSON.stringify(updatedPoems));

        setNewTitle('');
        setNewText('');
        // Keep author name for convenience
    };

    const handleLike = (id) => {
        const updatedPoems = poems.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
        setPoems(updatedPoems);
        localStorage.setItem('community_poetry_v2', JSON.stringify(updatedPoems));
    };

    // Sort by likes descending for the "more likes on top" requirement
    const sortedPoems = [...poems].sort((a, b) => b.likes - a.likes);

    return (
        <div className="container" style={{ minHeight: '80vh', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                <Feather size={40} color="var(--primary)" />
                <span className="text-gradient">Community Poetry</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', textAlign: 'center', fontSize: '1.2rem', maxWidth: '600px' }}>
                Compose your heartfelt verses. The most loved poems rise to the top. Board clears weekly!
            </p>

            {/* Composition Chatbox */}
            <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', marginBottom: '3rem', padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Type size={20} color="var(--primary)" /> Share Your Heart
                </h3>
                <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '2 1 300px', display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0 15px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                            <Type size={20} color="var(--accent)" />
                            <input
                                type="text"
                                placeholder="Poem Title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                                style={{ background: 'transparent', border: 'none', color: 'white', padding: '12px 0', outline: 'none', width: '100%', fontFamily: 'Outfit' }}
                            />
                        </div>
                    </div>

                    <textarea
                        className="input-glass"
                        placeholder="Write your poetry here... (Line breaks will be preserved)"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        required
                        rows={5}
                        style={{ resize: 'vertical', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', lineHeight: '1.8' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
                            <Send size={18} /> Publish Poem
                        </button>
                    </div>
                </form>
            </div>

            {/* Poetry Feed */}
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <AnimatePresence>
                    {sortedPoems.map((poem, index) => (
                        <motion.div
                            layout
                            key={poem.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="glass-panel"
                            style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
                        >
                            <Feather size={120} color="rgba(255, 255, 255, 0.02)" style={{ position: 'absolute', right: -20, bottom: -20, zIndex: 0, transform: 'rotate(-15deg)' }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                    <div>
                                        <h2 style={{ fontSize: '2.2rem', fontFamily: "'Playfair Display', serif", color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                            {poem.title}
                                        </h2>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            {poem.dateString}
                                        </div>
                                    </div>

                                    {/* Like Button */}
                                    <button
                                        onClick={() => handleLike(poem.id)}
                                        style={{
                                            background: 'rgba(255, 46, 147, 0.1)',
                                            border: '1px solid rgba(255, 46, 147, 0.3)',
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--primary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 46, 147, 0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 46, 147, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <Heart size={20} fill={poem.likes > 0 ? 'var(--primary)' : 'none'} className={poem.likes > 0 ? "animate-heartbeat" : ""} />
                                        {poem.likes}
                                    </button>
                                </div>

                                <div style={{ fontSize: '1.3rem', lineHeight: '2', whiteSpace: 'pre-wrap', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--text-main)', paddingLeft: '1rem', borderLeft: '3px solid rgba(255,255,255,0.1)' }}>
                                    {poem.text}
                                </div>

                                {index === 0 && poem.likes > 0 && (
                                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'linear-gradient(45deg, #FFD700, #FFA500)', color: '#000', fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase', boxShadow: '0 2px 10px rgba(255, 215, 0, 0.4)' }}>
                                        Most Loved ♥
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {sortedPoems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <Feather size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>No poetry yet this week. Be the first to share your heart!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Poetry;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calculator, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Home = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculateLove = (e) => {
        e.preventDefault();
        if (!name1 || !name2) return;

        setIsCalculating(true);
        setResult(null);

        setTimeout(() => {
            // Simple hash function for pseudo-random consistent calculation based on names
            const combined = (name1.toLowerCase().trim() + name2.toLowerCase().trim()).split('').sort().join('');
            let score = 0;
            for (let i = 0; i < combined.length; i++) {
                score += combined.charCodeAt(i);
            }

            const percentage = (score % 60) + 40; // Base 40% to keep things positive!

            setResult(percentage);
            setIsCalculating(false);

            if (percentage > 80) {
                triggerConfetti();
            }

            // Save to local storage for history
            const newEntry = {
                id: Date.now(),
                name1,
                name2,
                percentage,
                date: new Date().toLocaleString()
            };

            const history = JSON.parse(localStorage.getItem('loveHistory') || '[]');
            localStorage.setItem('loveHistory', JSON.stringify([newEntry, ...history]));

        }, 2000);
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FF2E93', '#FF8A00', '#8E2DE2']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FF2E93', '#FF8A00', '#8E2DE2']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    let resultMessage = '';
    if (result !== null) {
        if (result >= 90) resultMessage = "A Perfect Match! Written in the stars! ✨";
        else if (result >= 70) resultMessage = "Strong connection! You've got great chemistry! 🧪";
        else if (result >= 50) resultMessage = "There's potential here! Worth exploring! 🌱";
        else resultMessage = "Opposites attract? It might take some work! 🛠️";
    }

    return (
        <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-panel"
                style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Heart size={64} color="var(--primary)" fill="var(--primary)" className="animate-heartbeat" />
                        <Sparkles size={24} color="var(--secondary)" style={{ position: 'absolute', top: -10, right: -10 }} />
                    </div>
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    <span className="text-gradient">Love Calculator</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Enter two names to calculate your compatibility percentage.
                </p>

                <form onSubmit={calculateLove} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 200px' }}>
                            <input
                                type="text"
                                className="input-glass"
                                placeholder="Person 1"
                                value={name1}
                                onChange={(e) => setName1(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={24} color="var(--accent)" fill="var(--glass-bg)" />
                        </div>
                        <div style={{ flex: '1 1 200px' }}>
                            <input
                                type="text"
                                className="input-glass"
                                placeholder="Person 2"
                                value={name2}
                                onChange={(e) => setName2(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isCalculating}
                        style={{ width: '100%', justifyContent: 'center', opacity: isCalculating ? 0.7 : 1 }}
                    >
                        {isCalculating ? (
                            <span>Calculating...</span>
                        ) : (
                            <>
                                <Calculator size={20} />
                                Calculate Love
                            </>
                        )}
                    </button>
                </form>

                {isCalculating && (
                    <div style={{ marginTop: '2rem' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ display: 'inline-block' }}
                        >
                            <Heart size={40} color="var(--primary)" />
                        </motion.div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Analyzing quantum entanglement...</p>
                    </div>
                )}

                {result !== null && !isCalculating && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '15px' }}
                    >
                        <h2 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                            {result}%
                        </h2>

                        {/* Progress bar */}
                        <div style={{ width: '100%', height: '10px', background: 'var(--glass-bg)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${result}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>

                        <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>{resultMessage}</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Home;

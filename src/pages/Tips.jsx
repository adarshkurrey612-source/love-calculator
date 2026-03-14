import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, HeartHandshake, ShieldCheck, Speech, RefreshCw } from 'lucide-react';

const tipsData = [
    {
        icon: <Speech size={32} color="var(--primary)" />,
        title: "Communicate like an API",
        desc: "Clear inputs and expected outputs. Don't leave your partner guessing with an HTTP 400 Bad Request."
    },
    {
        icon: <ShieldCheck size={32} color="var(--secondary)" />,
        title: "Establish boundaries (CORS)",
        desc: "Make sure you both agree on Cross-Origin Resource Sharing. Respect personal space and time."
    },
    {
        icon: <RefreshCw size={32} color="var(--accent)" />,
        title: "Regular Updates & Maintenance",
        desc: "Like software, relationships need maintenance. Schedule regular 'syncs' to refactor and debug issues."
    },
    {
        icon: <HeartHandshake size={32} color="#ff4081" />,
        title: "Always Handle Exceptions",
        desc: "Disagreements are inevitable. Use try-catch blocks in arguments and ensure a graceful fallback."
    }
];

const Tips = () => {
    return (
        <div className="container" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                <span className="text-gradient">Relationship Tips</span>
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Best practices for continuous integration in your love life.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {tipsData.map((tip, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="glass-panel"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <div style={{ background: 'var(--glass-bg)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            {tip.icon}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', color: 'white' }}>{tip.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{tip.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ marginTop: '4rem', textAlign: 'center' }}
                className="glass-panel"
            >
                <Lightbulb size={40} color="var(--secondary)" className="animate-float" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Pro Tip</h2>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-main)' }}>
                    "Never push to production on a Friday, and never start a serious argument when hungry or sleepy."
                </p>
            </motion.div>
        </div>
    );
};

export default Tips;

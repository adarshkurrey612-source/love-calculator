import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronRight, ChevronLeft } from 'lucide-react';

const quotesData = [
    {
        category: "Romance",
        text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
        author: "Angelita Lim",
        icon: "💖"
    },
    {
        category: "Deep",
        text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        author: "Dr. Seuss",
        icon: "🌙"
    },
    {
        category: "Classic",
        text: "A successful marriage requires falling in love many times, always with the same person.",
        author: "Mignon McLaughlin",
        icon: "💍"
    },
    {
        category: "Sweet",
        text: "If I had a flower for every time I thought of you... I could walk through my garden forever.",
        author: "Alfred Tennyson",
        icon: "🌸"
    },
    {
        category: "Profound",
        text: "To love and be loved is to feel the sun from both sides.",
        author: "David Viscott",
        icon: "☀️"
    },
    {
        category: "Poetic",
        text: "Whatever our souls are made of, his and mine are the same.",
        author: "Emily Brontë",
        icon: "✨"
    },
    {
        category: "Modern",
        text: "I love you not only for what you are, but for what I am when I am with you.",
        author: "Roy Croft",
        icon: "💫"
    },
    {
        category: "Timeless",
        text: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn",
        icon: "🤝"
    },
    {
        category: "Humorous",
        text: "Love is sharing your popcorn.",
        author: "Charles Schultz",
        icon: "🍿"
    },
    {
        category: "Warm",
        text: "You are my today and all of my tomorrows.",
        author: "Leo Christopher",
        icon: "🌅"
    }
];

const Quotes = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextQuote = () => {
        setCurrentIndex((prev) => (prev === quotesData.length - 1 ? 0 : prev + 1));
    };

    const prevQuote = () => {
        setCurrentIndex((prev) => (prev === 0 ? quotesData.length - 1 : prev - 1));
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                <span className="text-gradient">Love Quotes</span>
            </h1>

            <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <Quote size={48} color="rgba(255, 46, 147, 0.2)" style={{ position: 'absolute', top: 20, left: 20 }} />
                <Quote size={48} color="rgba(255, 46, 147, 0.2)" style={{ position: 'absolute', bottom: 20, right: 20, transform: 'rotate(180deg)' }} />

                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            style={{ textAlign: 'center', padding: '0 4rem' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                {quotesData[currentIndex].icon}
                            </div>
                            <p style={{ fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                                "{quotesData[currentIndex].text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{quotesData[currentIndex].category}</span>
                                <span style={{ color: 'var(--text-muted)' }}>- {quotesData[currentIndex].author}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                    <button
                        onClick={prevQuote}
                        className="btn-primary"
                        style={{ padding: '10px', borderRadius: '50%' }}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {quotesData.map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    width: index === currentIndex ? '12px' : '8px',
                                    height: index === currentIndex ? '12px' : '8px',
                                    borderRadius: '50%',
                                    background: index === currentIndex ? 'var(--primary)' : 'var(--glass-bg)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextQuote}
                        className="btn-primary"
                        style={{ padding: '10px', borderRadius: '50%' }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quotes;

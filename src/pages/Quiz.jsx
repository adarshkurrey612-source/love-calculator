import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const quizQuestions = [
    {
        question: "When your partner describes a complex bug they're dealing with, what's your first reaction?",
        options: [
            { text: "Suggest returning a default value and calling it a day.", score: 0 },
            { text: "Listen quietly but start thinking about my own code.", score: 1 },
            { text: "Ask clarifying questions to help them debug the logic.", score: 3 },
            { text: "Open up a terminal and demand they share their screen.", score: 2 }
        ]
    },
    {
        question: "How do you prefer to spend a Sunday afternoon together?",
        options: [
            { text: "Refactoring legacy code together while sipping coffee.", score: 3 },
            { text: "Watching sci-fi movies and debating plot holes.", score: 2 },
            { text: "Going for a hike to escape screens entirely.", score: 1 },
            { text: "Arguing over tabs vs. spaces.", score: 0 }
        ]
    },
    {
        question: "Your partner mentions they want to try a new tech stack (e.g., Rust). You:",
        options: [
            { text: "Tell them it's a fad and stick to what works.", score: 0 },
            { text: "Smile and nod while they explain the borrow checker.", score: 1 },
            { text: "Offer to build a small project together to test it out.", score: 3 },
            { text: "Immediately rewrite everything you own in Rust.", score: 2 }
        ]
    },
    {
        question: "What's the ideal 'Date Date'?",
        options: [
            { text: "A quiet dinner parsing JSON files.", score: 2 },
            { text: "A hackathon where you compete against each other.", score: 1 },
            { text: "Collaborating on an open-source contribution.", score: 3 },
            { text: "Just staring at a blank screen together.", score: 0 }
        ]
    }
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        if (selectedOption !== null) {
            setScore(score + quizQuestions[currentQuestion].options[selectedOption].score);
            setSelectedOption(null);

            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResult(true);
            }
        }
    };

    const getResult = () => {
        const totalScore = score;
        const maxScore = quizQuestions.length * 3;
        const percentage = (totalScore / maxScore) * 100;

        if (percentage >= 80) return "Pair Programming Partners for Life! You two are perfectly synced.";
        if (percentage >= 50) return "Solid Connection! A few bugs to iron out, but a strong foundation.";
        if (percentage >= 30) return "Merge Conflict! You might operate on different frequencies, but communication is key.";
        return "Syntax Error. Hmm, are you sure you're compatible? Might need a major refactor.";
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>

            <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
                <span className="text-gradient">Tech Compatibility Quiz</span>
            </h1>

            <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', minHeight: '400px', position: 'relative' }}>

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                                    <div style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                                </div>
                            </div>

                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
                                {quizQuestions[currentQuestion].question}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                                {quizQuestions[currentQuestion].options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedOption(index)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: `2px solid ${selectedOption === index ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                            background: selectedOption === index ? 'rgba(255,46,147,0.1)' : 'rgba(255,255,255,0.05)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {selectedOption === index ? (
                                            <CheckCircle2 color="var(--primary)" size={24} />
                                        ) : (
                                            <Circle color="var(--text-muted)" size={24} />
                                        )}
                                        <span style={{ fontSize: '1.1rem', color: selectedOption === index ? 'white' : 'var(--text-main)' }}>
                                            {option.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <button
                                    onClick={handleNext}
                                    className="btn-primary"
                                    disabled={selectedOption === null}
                                    style={{ opacity: selectedOption === null ? 0.5 : 1, padding: '10px 24px' }}
                                >
                                    {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}
                        >
                            <AlertCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Result Analysis Complete</h2>
                            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '1rem' }}>
                                {Math.round((score / (quizQuestions.length * 3)) * 100)}%
                            </div>
                            <p style={{ fontSize: '1.5rem', marginBottom: '2.5rem', lineHeight: '1.5' }}>
                                {getResult()}
                            </p>

                            <button onClick={resetQuiz} className="btn-primary" style={{ padding: '12px 30px' }}>
                                <RotateCcw size={18} /> Retake Quiz
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Quiz;

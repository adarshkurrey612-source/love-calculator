import React, { useEffect, useState } from 'react';

const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 30; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    size: Math.random() * 20 + 5,
                    duration: Math.random() * 20 + 10,
                    delay: Math.random() * 10
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className="particles">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.x}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `-${particle.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Quotes from './pages/Quotes';
import Tips from './pages/Tips';
import Poetry from './pages/Poetry';
import Quiz from './pages/Quiz';
import History from './pages/History';
import './App.css';

function App() {
  return (
    <div className="app">
      <ParticleBackground />
      <Navbar />
      <main className="main-content container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

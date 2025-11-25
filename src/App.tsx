import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import { Projects } from './pages/Projects';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/projets" element={<Projects />} />
      </Routes>
    </Router>
  );
}
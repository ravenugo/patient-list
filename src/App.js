// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PatientList />} />
        <Route exact path="/patients" element={<PatientList />} />
      </Routes>
    </Router>
  );
};

export default App;
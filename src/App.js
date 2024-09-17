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
        <Route path="/patient/new" element={<PatientDetails />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
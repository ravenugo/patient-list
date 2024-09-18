// src/components/DemographicInformation.js
import React from 'react';
import '../App.css'; // Import global CSS
import './DemographicInformation.css'; // Import component-specific CSS

const DemographicInformation = ({ patient }) => {
  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="demographic-information">
      <h2>Demographic Information</h2>
      <div>
        <label>First Name:</label>
        <span>{patient.name[0]?.given[0]}</span>
      </div>
      <div>
        <label>Last Name:</label>
        <span>{patient.name[0]?.family}</span>
      </div>
      <div>
        <label>Gender:</label>
        <span>{patient.gender}</span>
      </div>
      <div>
        <label>Date of Birth:</label>
        <span>{patient.birthDate}</span>
      </div>
      <div>
        <label>Phone Number:</label>
        <span>{patient.telecom[0]?.value}</span>
      </div>
    </div>
  );
};

export default DemographicInformation;
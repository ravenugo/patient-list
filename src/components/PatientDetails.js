// src/components/PatientDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../services/fhirService';
import '../App.css'; // Import global CSS
import './PatientDetails.css'; // Import component-specific CSS
import DemographicInformation from './DemographicInformation'; // Import the DemographicInformation component
import LeftNav from './LeftNav'; // Import the LeftNav component

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatient(patientId);
        console.log('Fetched patient data:', data); // Add this line
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    fetchPatient();
  }, [patientId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DemographicInformation patient={patient} />;
      // Add more cases for other tabs as needed
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <LeftNav /> {/* Render the LeftNav component */}
      <div className="content-container">
        <h1> {patient ? `${patient.name[0]?.given[0]} ${patient.name[0]?.family}` : 'Loading...'}</h1>
        <div className="tabs">
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
            {/* Add more tabs as needed */}
        </div>
        <div className="tab-content">
            {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
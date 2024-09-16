import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/fhirService';
import './PatientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="table-container">
      <h1>Patient List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((entry) => {
            const patient = entry.resource;
            const formattedDOB = patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : 'N/A';
            return (
              <tr key={patient.id}>
                <td>{patient.name?.[0]?.given?.join(' ') || 'N/A'} {patient.name?.[0]?.family || ''}</td>
                <td>{patient.gender || 'N/A'}</td>
                <td>{formattedDOB}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
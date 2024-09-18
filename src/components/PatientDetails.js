import React, { useState, useEffect } from 'react';
import { getPatient, updatePatient, createPatient } from '../services/fhirService';
import '../App.css'; // Import global CSS
import './PatientDetails.css'; // Import component-specific CSS

const PatientDetails = ({ mode, patientId, onSuccess }) => {
  const [patient, setPatient] = useState({
    name: [{ given: [''], family: '' }],
    gender: '',
    birthDate: '',
    telecom: [{ system: 'phone', value: '' }]
  });

  useEffect(() => {
    if (mode === 'edit' && patientId) {
      const fetchPatient = async () => {
        try {
          const data = await getPatient(patientId);
          setPatient(data);
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
      };
      fetchPatient();
    }
  }, [mode, patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => {
      if (name === 'given') {
        return {
          ...prevPatient,
          name: [{ ...prevPatient.name[0], given: [value] }]
        };
      } else if (name === 'family') {
        return {
          ...prevPatient,
          name: [{ ...prevPatient.name[0], family: value }]
        };
      } else if (name === 'telecom') {
        return {
          ...prevPatient,
          telecom: [{ ...prevPatient.telecom[0], value }]
        };
      } else {
        return {
          ...prevPatient,
          [name]: value
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        await updatePatient(patientId, patient);
      } else {
        await createPatient(patient);
      }
      onSuccess(); // Call the onSuccess callback to close the modal and refresh the parent page
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <div>
      <h1>{mode === 'edit' ? 'Edit Patient' : 'Create Patient'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="given"
            value={patient.name[0]?.given[0] || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="family"
            value={patient.name[0]?.family || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={patient.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={patient.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="telecom"
            value={patient.telecom[0]?.value || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{mode === 'edit' ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PatientDetails;
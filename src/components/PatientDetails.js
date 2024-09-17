import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, updatePatient, createPatient } from '../services/fhirService';
import '../App.css'; // Import global CSS
import './PatientDetails.css'; // Import component-specific CSS

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: [{ given: [''], family: '' }],
    gender: '',
    birthDate: '',
    telecom: [{ system: 'phone', value: '' }]
  });

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const data = await getPatient(id);
          setPatient(data);
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
      };
      fetchPatient();
    }
  }, [id]);

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
      if (id) {
        await updatePatient(id, patient);
      } else {
        await createPatient(patient);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Patient' : 'Create Patient'}</h1>
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
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PatientDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../services/fhirService';
import ReactPaginate from 'react-paginate';
import '../App.css'; // Import global CSS
import './PatientList.css'; // Import component-specific CSS

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const patientsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async (page) => {
      try {
        const data = await getPatients(page, patientsPerPage);
        setPatients(Array.isArray(data.entry) ? data.entry : []);
        setTotalPatients(data.total || 0); // Assuming 'total' is provided in the response
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // ReactPaginate uses 0-based index
  };

  const handleCreatePatient = () => {
    navigate('/patient/new');
  };

  const handleEditPatient = (id) => {
    navigate(`/patient/${id}`);
  };

  return (
    <div className="table-container">
      <h1>Patient List</h1>
      <button onClick={handleCreatePatient}>Create Patient</button>
      <p>Total Patients: {totalPatients}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((entry) => {
            const patient = entry.resource;
            const formattedDOB = patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : 'N/A';
            const formattedLastUpdated = patient.meta?.lastUpdated ? new Date(patient.meta.lastUpdated).toLocaleString() : 'N/A';
            return (
              <tr key={patient.id}>
                <td>{patient.name?.[0]?.given?.join(' ') || 'N/A'} {patient.name?.[0]?.family || ''}</td>
                <td>{patient.gender || 'N/A'}</td>
                <td>{formattedDOB}</td>
                <td>{formattedLastUpdated}</td>
                <td>
                  <button onClick={() => handleEditPatient(patient.id)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(totalPatients / patientsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PatientList;
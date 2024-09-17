import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../services/fhirService';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';
import LeftNav from './LeftNav'; // Import the LeftNav component
import '../App.css'; // Import global CSS
import './PatientList.css'; // Import component-specific CSS

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const patientsPerPage = 10;
  const navigate = useNavigate();

  const fetchPatients = async (page, name, phone) => {
    try {
      const data = await getPatients(page, patientsPerPage, name, phone);
      setPatients(Array.isArray(data.entry) ? data.entry : []);
      setTotalPatients(data.total || 0); // Assuming 'total' is provided in the response
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage, searchName, searchPhone);
  }, [currentPage, searchName, searchPhone]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // ReactPaginate uses 0-based index
  };

  const handleCreatePatient = () => {
    navigate('/patient/new');
  };

  const handleEditPatient = (id) => {
    navigate(`/patient/${id}`);
  };

  const debouncedFetchPatients = useMemo(
    () => debounce((name, phone) => {
      fetchPatients(1, name, phone);
    }, 300),
    []
  );

  const handleSearchNameChange = (e) => {
    const value = e.target.value;
    setSearchName(value);
    debouncedFetchPatients(value, searchPhone);
  };

  const handleSearchPhoneChange = (e) => {
    const value = e.target.value;
    setSearchPhone(value);
    debouncedFetchPatients(searchName, value);
  };

  return (
    <div className="app-container">
      <LeftNav /> {/* Include the LeftNav component */}
      <div className="content-container">
        <h1>Patients</h1>
        <button onClick={handleCreatePatient}>Create Patient</button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <input
            type="text"
            placeholder="Search by phone number"
            value={searchPhone}
            onChange={handleSearchPhoneChange}
          />
        </div>
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
    </div>
  );
};

export default PatientList;
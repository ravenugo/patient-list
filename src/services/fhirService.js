// src/services/fhirService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/fhir';

export const getPatients = async (page = 1, count = 10, name = '', phone = '') => {
  const offset = (page - 1) * count;
  let url = `${BASE_URL}/Patient?_sort=-_lastUpdated&_count=${count}&_getpagesoffset=${offset}&_total=accurate`;

  if (name) {
    url += `&name=${name}`;
  }

  if (phone) {
    url += `&telecom:contains=${phone}`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatient = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Patient/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

export const updatePatient = async (id, patient) => {
  try {
    const response = await axios.put(`${BASE_URL}/Patient/${id}`, patient);
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const createPatient = async (patient) => {
  try {
    const patientWithResourceType = { ...patient, resourceType: 'Patient' };
    const response = await axios.post(`${BASE_URL}/Patient`, patientWithResourceType);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};
// src/services/fhirService.js
import axios from 'axios';

const BASE_URL = 'http://hapi.fhir.org/baseR4';

export const getPatients = async (page = 1, count = 10) => {
  const offset = (page - 1) * count;
  const url = `${BASE_URL}/Patient?_sort=-_lastUpdated&_count=${count}&_getpagesoffset=${offset}&_total=accurate`;
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
    const response = await axios.post(`${BASE_URL}/Patient`, patient);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};
import axios from 'axios';

const BASE_URL = 'http://hapi.fhir.org/baseR4';

export const getPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Patient?_sort=-_lastUpdated`);
    return response.data.entry || [];
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};
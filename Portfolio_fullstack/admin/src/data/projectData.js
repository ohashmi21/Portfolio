import axios from 'axios';
const SERVER_BASE_URL = 'http://localhost:3005';

export async function getProjectData() {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/projectdata`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateProjectData(data) {
  try {
    await axios.post(`${SERVER_BASE_URL}/updateprojects`, data);
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

export async function uploadProjectImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(`${SERVER_BASE_URL}/uploadprojectimage`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}

export async function deleteProjectImage(fileName) {
  await axios.delete(`${SERVER_BASE_URL}/projectimage/${encodeURIComponent(fileName)}`);
}

export function getProjectImageUrl(fileName) {
  if (!fileName) {
    return '';
  }
  return `${SERVER_BASE_URL}/public/${fileName}`;
}




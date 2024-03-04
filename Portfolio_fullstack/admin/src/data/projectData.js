import axios from 'axios';

export async function getProjectData() {
  try {
    const response = await axios.get('http://localhost:3005/projectdata');
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateProjectData(data) {
  try {
    await axios.post("http://localhost:3005/updateprojects", data);
    
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}




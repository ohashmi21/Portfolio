import axios from 'axios'

const PROJECT_IMAGE_BASE_URL = 'http://localhost:3005/public';

export async function getProjectData(){
  return axios.get('http://localhost:3005/projectdata')
    .then(response=>{
      return response.data
    })
    .catch(error => {
      console.log("Error fetching data")
      throw error;
    })
}

export function getProjectImageUrl(fileName){
  if (!fileName) {
    return '';
  }
  return `${PROJECT_IMAGE_BASE_URL}/${encodeURIComponent(fileName)}`;
}

module.exports = {getProjectData, getProjectImageUrl};
import { Link } from "react-router-dom"
import axios from 'axios'

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

module.exports = {getProjectData};
import { Link } from "react-router-dom"
import axios from 'axios'

export async function getExperienceData(){
  return axios.get('http://localhost:3005/experiencedata')
    .then(response=>{
      return response.data
    })
    .catch(error => {
      console.log("Error fetching data")
      throw error;
    })
}

module.exports = {getExperienceData};
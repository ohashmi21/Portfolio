import { Link } from "react-router-dom"
import axios from 'axios'

export async function getVolunteerData(){
  return axios.get('http://localhost:3005/volunteerData')
    .then(response=>{
      return response.data
    })
    .catch(error => {
      console.log("Error fetching data")
      throw error;
    })
}

module.exports = {getVolunteerData};
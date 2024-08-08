import axios from 'axios'

export async function getVolunteerData(){
    try{
        const response = await axios.get('http://localhost:3005/volunteerdata');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function updateVolunteerData(data) {
    try{
        await axios.post("http://localhost:3005/updatevolunteer", data);
        console.log("Data updated successfully");
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
}
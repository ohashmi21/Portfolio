import axios from 'axios'

export async function getExperienceData(){
    try{
        const response = await axios.get('http://localhost:3005/experiencedata');
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function updateExperienceData(data) {
    try{
        await axios.post("http://localhost:3005/updateexperience", data);
        console.log("Data updated successfully");
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
}
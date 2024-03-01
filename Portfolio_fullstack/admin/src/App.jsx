import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProjectData, updateProjectData } from './data/projectData.js';


function App() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjectData();
        setProjectData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []); // Passing an empty dependency array to useEffect

  const handleNameChange = (index, newName) => {
    setProjectData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].name = newName;
      return updatedData;
    });
  };

  const handleDescriptionChange = (index, newDescription) => {
    setProjectData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
  };

  const handleSkillsChange = (index, newSkills) => {
    setProjectData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].skills = newSkills;
      return updatedData;
    });
  };


  const handleUpdate = async () => {
    try {
      await updateProjectData(projectData); // Update project data in the database
      console.log("Project data updated successfully");
    } catch (error) {
      console.log("Error updating project data:", error);
    }
  };

  return (
    <div>
      {projectData.map((project, index) => (
        <div key={index} className='dataItem'>
          <h1>Project {index + 1}</h1>
          <h3>Name</h3>
          <textarea
            type="text"
            value={project.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Description</h3>
          <textarea
            value={project.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Skills</h3>
          <textarea
            type="text"
            value={project.skills}
            onChange={(e) => handleSkillsChange(index, e.target.value)}
            className='dataInput'
          />
        </div>
      ))}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProjectData, updateProjectData } from './data/projectData.js';
import { Button, Modal, Form } from 'react-bootstrap'; // Import necessary components from Bootstrap

function App() {
  const [projectData, setProjectData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

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
  }, []);

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
      await updateProjectData(projectData);
      console.log("Project data updated successfully");
    } catch (error) {
      console.log("Error updating project data:", error);
    }
  };

  const addProject = (name, description, skills) => {
    const newProject = {
        name: name,
        description: description,
        skills: skills
    };
    
    projectData.push(newProject);
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
      {/* Button to toggle modal */}
      <Button onClick={() => setShowModal(true)}>Add Project</Button>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields for adding project */}
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter project description" />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" placeholder="Enter project skills" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button onClick={() => {setShowModal(false); addProject(document.getElementById("projectName").value, document.getElementById("projectDescription").value, document.getElementById("projectSkills").value,)}}>Save Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

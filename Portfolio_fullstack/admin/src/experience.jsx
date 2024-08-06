import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getExperienceData, updateExperienceData } from './data/experienceData.js';
import { Button, Modal, Form } from 'react-bootstrap'; // Import necessary components from Bootstrap

function TExperience() {
  const [experienceData, setExperienceData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExperienceData();
        setExperienceData(data);
        console.log(data.role)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleRoleChange = (index, newRole) => {
    setExperienceData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].role = newRole;
      return updatedData;
    });
  };

  const handleDescriptionChange = (index, newDescription) => {
    setExperienceData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
  };

  const handleCompanyChange = (index, newCompany) => {
    setExperienceData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].company = newCompany;
      return updatedData;
    });
  };

  const handleUpdate = async () => {
    try {
      await updateExperienceData(experienceData);
      console.log("Experience data updated successfully");
    } catch (error) {
      console.log("Error updating experience data:", error);
    }
  };

  const addExperiece = (role, description, company) => {
    const newExperience = {
        role: role,
        description: description,
        company: company
    };
    
    experienceData.push(newExperience);
};


  return (
    <div>
      {experienceData.map((experience, index) => (
        <div key={index} className='dataItem'>
          <h1>Experience {index + 1}</h1>
          <h3>Role</h3>
          <textarea
            type="text"
            value={experience.role}
            onChange={(e) => handleRoleChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Description</h3>
          <textarea
            value={experience.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Company</h3>
          <textarea
            type="text"
            value={experience.company}
            onChange={(e) => handleCompanyChange(index, e.target.value)}
            className='dataInput'
          />
        </div>
      ))}
      <div className='buttons'>
      <button onClick={handleUpdate}>Update</button>
      {/* Button to toggle modal */}
      <Button onClick={() => setShowModal(true)} className='addProject'>Add Experience</Button>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title  >Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields for adding project */}
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter project description" />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" placeholder="Enter project skills" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button onClick={() => {setShowModal(false); addExperiece(document.getElementById("projectName").value, document.getElementById("projectDescription").value, document.getElementById("projectSkills").value,)}}>Save Experience</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default TExperience;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getVolunteerData, updateVolunteerData } from './data/leadershipData.js';
import { Button, Modal, Form } from 'react-bootstrap'; // Import necessary components from Bootstrap

function TVolunteer() {
  const [volunteerData, setVolunteerData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVolunteerData();
        setVolunteerData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handlePositionChange = (index, newPosition) => {
    setVolunteerData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].position = newPosition;
      return updatedData;
    });
  };

  const handleDescriptionChange = (index, newDescription) => {
    setVolunteerData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
  };

  const handleOrganizationChange = (index, newOrganization) => {
    setVolunteerData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].organization = newOrganization;
      return updatedData;
    });
  };

  const handleUpdate = async () => {
    try {
      await updateVolunteerData(volunteerData);
      console.log("Experience data updated successfully");
    } catch (error) {
      console.log("Error updating experience data:", error);
    }
  };

  const addVolunteer = (position, description, organization) => {
    const newVolunteer = {
        position: position,
        description: description,
        organization: organization
    };
    
    volunteerData.push(newVolunteer);
};


  return (
    <div>
      {volunteerData.map((volunteer, index) => (
        <div key={index} className='dataItem'>
          <h1>Volunteer {index + 1}</h1>
          <h3>Postion</h3>
          <textarea
            type="text"
            value={volunteer.position}
            onChange={(e) => handlePositionChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Description</h3>
          <textarea
            value={volunteer.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            className='dataInput'
          />
          <h3>Organization</h3>
          <textarea
            type="text"
            value={volunteer.organization}
            onChange={(e) => handleOrganizationChange(index, e.target.value)}
            className='dataInput'
          />
        </div>
      ))}
      <div className='buttons'>
      <button onClick={handleUpdate}>Update</button>
      {/* Button to toggle modal */}
      <Button onClick={() => setShowModal(true)} className='addProject'>Add Volunteer</Button>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title  >Add Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields for adding project */}
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Enter position" />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter position description" />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Organization</Form.Label>
              <Form.Control type="text" placeholder="Enter Organization" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button onClick={() => {setShowModal(false); addVolunteer(document.getElementById("projectName").value, document.getElementById("projectDescription").value, document.getElementById("projectSkills").value,)}}>Save Volunteer</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default TVolunteer;

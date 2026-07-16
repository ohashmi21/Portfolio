import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getVolunteerData, updateVolunteerData } from './data/leadershipData.js';
import { Modal, Form } from 'react-bootstrap';

function TVolunteer() {
  const [volunteerData, setVolunteerData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusText, setStatusText] = useState('Changes are local until you click Save All.');
  const [newVolunteer, setNewVolunteer] = useState({ position: '', description: '', organization: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVolunteerData();
        setVolunteerData(data);
      } catch (error) {
        console.log(error);
        setStatusText('Unable to load volunteer data.');
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
    setStatusText('Unsaved changes');
  };

  const handleDescriptionChange = (index, newDescription) => {
    setVolunteerData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleOrganizationChange = (index, newOrganization) => {
    setVolunteerData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].organization = newOrganization;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      await updateVolunteerData(volunteerData);
      setStatusText('All changes saved.');
    } catch (error) {
      console.log("Error updating experience data:", error);
      setStatusText('Save failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addVolunteer = () => {
    if (!newVolunteer.position.trim()) {
      setStatusText('Position is required.');
      return;
    }

    const newVolunteerEntry = {
        position: newVolunteer.position.trim(),
        description: newVolunteer.description.trim(),
        organization: newVolunteer.organization.trim()
    };

    setVolunteerData((prev) => [...prev, newVolunteerEntry]);
    setShowModal(false);
    setNewVolunteer({ position: '', description: '', organization: '' });
    setStatusText('Unsaved changes');
  };


  return (
    <div className='editorShell'>
      <div className='editorTopbar'>
        <h2 className='editorTitle'>Volunteer</h2>
        <p className='editorStatus'>{statusText}</p>
      </div>
      {volunteerData.map((volunteer, index) => (
        <div key={index} className='dataItem'>
          <h3>Volunteer {index + 1}</h3>
          <h3>Position</h3>
          <textarea
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
      {volunteerData.length === 0 && <div className='emptyState'>No volunteer entries available yet.</div>}
      <div className='buttons'>
      <button onClick={handleUpdate} className='primaryAction' disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save All'}
      </button>
      <button onClick={() => setShowModal(true)} className='secondaryAction'>Add Volunteer</button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter position"
                value={newVolunteer.position}
                onChange={(event) => setNewVolunteer((prev) => ({ ...prev, position: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter position description"
                value={newVolunteer.description}
                onChange={(event) => setNewVolunteer((prev) => ({ ...prev, description: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization"
                value={newVolunteer.organization}
                onChange={(event) => setNewVolunteer((prev) => ({ ...prev, organization: event.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='secondaryAction' onClick={() => setShowModal(false)}>Close</button>
          <button className='primaryAction' onClick={addVolunteer}>Add</button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default TVolunteer;

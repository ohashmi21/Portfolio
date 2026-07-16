import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getExperienceData, updateExperienceData } from './data/experienceData.js';
import { Modal, Form } from 'react-bootstrap';

function TExperience() {
  const [experienceData, setExperienceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusText, setStatusText] = useState('Changes are local until you click Save All.');
  const [newExperience, setNewExperience] = useState({ role: '', description: '', company: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExperienceData();
        setExperienceData(data);
      } catch (error) {
        console.log(error);
        setStatusText('Unable to load experience data.');
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
    setStatusText('Unsaved changes');
  };

  const handleDescriptionChange = (index, newDescription) => {
    setExperienceData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleCompanyChange = (index, newCompany) => {
    setExperienceData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].company = newCompany;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      await updateExperienceData(experienceData);
      setStatusText('All changes saved.');
    } catch (error) {
      console.log("Error updating experience data:", error);
      setStatusText('Save failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    if (!newExperience.role.trim()) {
      setStatusText('Role is required.');
      return;
    }

    const newExperienceEntry = {
        role: newExperience.role.trim(),
        description: newExperience.description.trim(),
        company: newExperience.company.trim()
    };

    setExperienceData((prev) => [...prev, newExperienceEntry]);
    setShowModal(false);
    setNewExperience({ role: '', description: '', company: '' });
    setStatusText('Unsaved changes');
  };


  return (
    <div className='editorShell'>
      <div className='editorTopbar'>
        <h2 className='editorTitle'>Experience</h2>
        <p className='editorStatus'>{statusText}</p>
      </div>
      {experienceData.map((experience, index) => (
        <div key={index} className='dataItem'>
          <h3>Experience {index + 1}</h3>
          <h3>Role</h3>
          <textarea
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
      {experienceData.length === 0 && <div className='emptyState'>No experience entries available yet.</div>}
      <div className='buttons'>
      <button onClick={handleUpdate} className='primaryAction' disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save All'}
      </button>
      <button onClick={() => setShowModal(true)} className='secondaryAction'>Add Experience</button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                value={newExperience.role}
                onChange={(event) => setNewExperience((prev) => ({ ...prev, role: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter experience description"
                value={newExperience.description}
                onChange={(event) => setNewExperience((prev) => ({ ...prev, description: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company"
                value={newExperience.company}
                onChange={(event) => setNewExperience((prev) => ({ ...prev, company: event.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='secondaryAction' onClick={() => setShowModal(false)}>Close</button>
          <button className='primaryAction' onClick={addExperience}>Add</button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default TExperience;

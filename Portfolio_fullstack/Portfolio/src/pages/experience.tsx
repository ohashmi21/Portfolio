import React, { useEffect, useState } from 'react';
import { getExperienceData } from './api/data/experienceData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


const ExperienceCard = ({ experience, onClick }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{experience.company}</Card.Title>
        <Card.Subtitle className="mb-2 mt-2 text-light">{experience.role}</Card.Subtitle>
        <Button variant="primary" onClick={onClick}>
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

const ExperienceModal = ({ show, onHide, experience }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {experience.role} at {experience.company}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Description</h4>
        <p>{experience.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Experience() {
  const [visibleContent, setVisibleContent] = useState("Work");
  const [experience, setExperience] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
    setModalShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getExperienceData();
      setExperience(data);
    } catch (error) {
      console.error("Error fetching experience data:", error);
    }
  }

  const handleShowExperience = () => {
    setVisibleContent("Work");
  };

  const handleShowVolunteer = () => {
    setVisibleContent("Volunteer");
  };

  return (
    <div className="experienceContainer" id="experience">
      <p className='eHeader'>Experience</p>
      <div className="buttonSelector">
        <p onClick={handleShowExperience}>Work</p>
        <p onClick={handleShowVolunteer}>Volunteer</p>
      </div>
      {visibleContent === "Work" && (
        <div className='workContainer'>
          {experience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} onClick={() => handleCardClick(exp)} />
          ))}
          {selectedExperience && (
            <ExperienceModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              experience={selectedExperience}
            />
          )}
        </div>
      )}
      {visibleContent === "Volunteer" && (
        <div>
          <h2>Volunteer Experience</h2>
          <p>Details about your volunteer experience...</p>
        </div>
      )}
    </div>
  );
}

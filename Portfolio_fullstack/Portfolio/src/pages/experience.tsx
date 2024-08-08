import React, { useEffect, useState } from 'react';
import { getExperienceData } from './api/data/experienceData';
import { getVolunteerData } from './api/data/leadershipData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const cardStyle = {
  width: '18rem',
  height: '11rem',
  margin: '10px'
};

const ExperienceCard = ({ experience, onClick }) => {
  return (
    <Card style={cardStyle}>
      <Card.Body className="card-body">
        <Card.Title className="card-title">{experience.company}</Card.Title>
        <Card.Subtitle className="card-subtitle mb-2 mt-2">{experience.role}</Card.Subtitle>
        <Button variant="primary" onClick={onClick}>
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

const VolunteerCard = ({ volunteer, onClick }) => {
  return (
    <Card style={cardStyle}>
      <Card.Body className="card-body">
        <Card.Title className="card-title">{volunteer.organization}</Card.Title>
        <Card.Subtitle className="card-subtitle mb-2 mt-2">{volunteer.position}</Card.Subtitle>
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

const VolunteerModal = ({ show, onHide, volunteer }) => {
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
          {volunteer.position} at {volunteer.organization}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Description</h4>
        <p>{volunteer.description}</p>
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
  const [volunteer, setVolunteer] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const handleExperienceCardClick = (experience) => {
    setSelectedExperience(experience);
    setSelectedVolunteer(null); // Clear volunteer selection
    setModalShow(true);
  };

  const handleVolunteerCardClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setSelectedExperience(null); // Clear experience selection
    setModalShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getExperienceData();
      const vdata = await getVolunteerData();
      setExperience(data);
      setVolunteer(vdata);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <ExperienceCard key={index} experience={exp} onClick={() => handleExperienceCardClick(exp)} />
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
        <div className='workContainer'>
          {volunteer.map((vol, index) => (
            <VolunteerCard key={index} volunteer={vol} onClick={() => handleVolunteerCardClick(vol)} />
          ))}
          {selectedVolunteer && (
            <VolunteerModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              volunteer={selectedVolunteer}
            />
          )}
        </div>
      )}
    </div>
  );
}

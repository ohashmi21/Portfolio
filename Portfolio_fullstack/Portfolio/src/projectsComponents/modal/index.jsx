import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectModal = ({ show, onHide, project }) => {
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
          {project.name} | <i>{project.skills}</i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Description</h4>
        <p>{project.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;


import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getProjectData,
  updateProjectData,
  uploadProjectImage,
  deleteProjectImage,
  getProjectImageUrl
} from './data/projectData.js';
import { Modal, Form } from 'react-bootstrap';

function TProjects() {
  const [projectData, setProjectData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [statusText, setStatusText] = useState('Changes are local until you click Save All.');
  const [pendingFiles, setPendingFiles] = useState({});
  const [newProject, setNewProject] = useState({ name: '', description: '', skills: '', imageFiles: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjectData();
        setProjectData(data);
      } catch (error) {
        console.log(error);
        setStatusText('Unable to load project data.');
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
    setStatusText('Unsaved changes');
  };

  const handleDescriptionChange = (index, newDescription) => {
    setProjectData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].description = newDescription;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleSkillsChange = (index, newSkills) => {
    setProjectData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].skills = newSkills;
      return updatedData;
    });
    setStatusText('Unsaved changes');
  };

  const handleUpdate = async () => {
    const hasMissingImages = projectData.some((project) => !project.Images || project.Images.length === 0);
    if (hasMissingImages) {
      setStatusText('Every project must have at least one image before saving.');
      return;
    }

    try {
      setIsSaving(true);
      await updateProjectData(projectData);
      setStatusText('All changes saved.');
    } catch (error) {
      console.log("Error updating project data:", error);
      setStatusText('Save failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePendingFileChange = (index, files) => {
    setPendingFiles((prev) => ({ ...prev, [index]: files ? Array.from(files) : [] }));
  };

  const handleImageUpload = async (index) => {
    const imageFiles = pendingFiles[index];
    if (!imageFiles || imageFiles.length === 0) {
      setStatusText('Select at least one image before uploading.');
      return;
    }

    try {
      setUploadingIndex(index);
      const uploaded = await Promise.all(imageFiles.map((file) => uploadProjectImage(file)));
      const fileNames = uploaded.map((result) => result.fileName);
      setProjectData((prevData) => {
        const updatedData = [...prevData];
        const existingImages = updatedData[index].Images || [];
        updatedData[index] = { ...updatedData[index], Images: [...existingImages, ...fileNames] };
        return updatedData;
      });
      setPendingFiles((prev) => ({ ...prev, [index]: [] }));
      setStatusText('Images uploaded. Remember to Save All.');
    } catch (error) {
      console.error(error);
      setStatusText('Image upload failed. Please try again.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleImageDelete = async (index, imageIndex) => {
    const fileName = projectData[index]?.Images?.[imageIndex];
    if (!fileName) {
      return;
    }

    try {
      await deleteProjectImage(fileName);
    } catch (error) {
      if (error?.response?.status !== 404) {
        console.error(error);
        setStatusText('Could not delete image from server.');
        return;
      }
    }

    setProjectData((prevData) => {
      const updatedData = [...prevData];
      const updatedImages = updatedData[index].Images.filter((_, i) => i !== imageIndex);
      updatedData[index] = { ...updatedData[index], Images: updatedImages };
      return updatedData;
    });
    setStatusText('Image removed. Remember to Save All.');
  };

  const handleSetCoverImage = (index, imageIndex) => {
    setProjectData((prevData) => {
      const updatedData = [...prevData];
      const images = [...updatedData[index].Images];
      const [cover] = images.splice(imageIndex, 1);
      images.unshift(cover);
      updatedData[index] = { ...updatedData[index], Images: images };
      return updatedData;
    });
    setStatusText('Cover image updated. Remember to Save All.');
  };

  const addProject = async () => {
    if (!newProject.name.trim()) {
      setStatusText('Project name is required.');
      return;
    }

    if (!newProject.imageFiles || newProject.imageFiles.length === 0) {
      setStatusText('At least one project image is required.');
      return;
    }

    const newProjectEntry = {
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      skills: newProject.skills.trim(),
      Images: []
    };

    try {
      setIsAdding(true);
      const uploaded = await Promise.all(newProject.imageFiles.map((file) => uploadProjectImage(file)));
      newProjectEntry.Images = uploaded.map((result) => result.fileName);

      setProjectData((prev) => [...prev, newProjectEntry]);
      setShowModal(false);
      setNewProject({ name: '', description: '', skills: '', imageFiles: [] });
      setStatusText('Project added. Remember to Save All.');
    } catch (error) {
      console.error(error);
      setStatusText('Could not upload images for new project.');
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div className='editorShell'>
      <div className='editorTopbar'>
        <h2 className='editorTitle'>Projects</h2>
        <p className='editorStatus'>{statusText}</p>
      </div>
      {projectData.map((project, index) => (
        <div key={index} className='dataItem'>
          <h3>Project {index + 1}</h3>
          <h3>Name</h3>
          <textarea
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
          <h3>Images</h3>
          {(!project.Images || project.Images.length === 0) && (
            <p className='imageNameText'>No images selected</p>
          )}
          <div className='imageGrid'>
            {(project.Images || []).map((image, imageIndex) => (
              <div key={image} className='imageGridItem'>
                <img
                  src={getProjectImageUrl(image)}
                  alt={`Preview ${imageIndex + 1} for ${project.name}`}
                  className='imagePreview'
                />
                {imageIndex === 0 ? (
                  <span className='coverBadge'>Cover</span>
                ) : (
                  <button
                    className='secondaryAction'
                    onClick={() => handleSetCoverImage(index, imageIndex)}
                  >
                    Set as Cover
                  </button>
                )}
                <button
                  className='secondaryAction'
                  onClick={() => handleImageDelete(index, imageIndex)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className='imageActions'>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => handlePendingFileChange(index, event.target.files)}
              className='imageFileInput'
            />
            <button
              className='secondaryAction'
              onClick={() => handleImageUpload(index)}
              disabled={uploadingIndex === index}
            >
              {uploadingIndex === index ? 'Uploading...' : 'Upload Image(s)'}
            </button>
          </div>
        </div>
      ))}
      {projectData.length === 0 && <div className='emptyState'>No projects available yet.</div>}
      <div className='buttons'>
      <button onClick={handleUpdate} className='primaryAction' disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save All'}
      </button>
      <button onClick={() => setShowModal(true)} className='secondaryAction'>Add Project</button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(event) => setNewProject((prev) => ({ ...prev, name: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={(event) => setNewProject((prev) => ({ ...prev, description: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project skills"
                value={newProject.skills}
                onChange={(event) => setNewProject((prev) => ({ ...prev, skills: event.target.value }))}
              />
            </Form.Group>
            <Form.Group controlId="projectImage">
              <Form.Label>Images (at least one required)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setNewProject((prev) => ({ ...prev, imageFiles: Array.from(event.target.files || []) }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='secondaryAction' onClick={() => setShowModal(false)}>Close</button>
          <button className='primaryAction' onClick={addProject} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add'}
          </button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default TProjects;

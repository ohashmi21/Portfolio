import React, { useEffect, useState } from 'react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination } from 'swiper/modules'; // Import Swiper library
import Swiper from "swiper";
Swiper.use([EffectCoverflow, Pagination]);
import { motion } from 'framer-motion';
import Modal from '@/projectsComponents/modal/index.jsx';
const { getProjectData, getProjectImageUrl } = require('./api/data/projectData.js');

function MySwiperComponent() {
  const [projects, setProjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    fetchData();
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
    // Clean up Swiper instance when the component unmounts
    return () => {
      swiper.destroy();
    };
  }, []);

  async function fetchData() {
    try {
      const data = await getProjectData(); // Fetch project data
      setProjects(data); // Update projects state with fetched data
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };

  return (
    <div className='projectsContainer' id="projects">
      <div><p className='sectionHeader'>Projects</p></div>
      <div className='swiperContainer'>
        <div className="mySwiper">
          <div className="swiper-wrapper">
            {projects.map((project, index) => (
              <div className="swiper-slide" id="myBtn" key={index}>
                <motion.div onClick={() => handleCardClick(project)}>
                  {project.Images?.[0] && !brokenImages[index] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getProjectImageUrl(project.Images[0])}
                      alt={project.name}
                      onError={() =>
                        setBrokenImages((prevState) => ({ ...prevState, [index]: true }))
                      }
                    />
                  ) : (
                    <div className="projectImageFallback">Image unavailable</div>
                  )}
                </motion.div>
                <p className='projectName'>{project.name}</p>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        {selectedProject && (
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            project={selectedProject}
          />
        )}
      </div>
      <div id="projectsBorder"></div>
    </div>
  );
}

export default MySwiperComponent;

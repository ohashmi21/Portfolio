import React, {useEffect, useState } from 'react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination } from 'swiper/modules'; // Import Swiper library
import Swiper from "swiper"
Swiper.use([EffectCoverflow, Pagination])
import Image from 'next/image';
import naymahHashmi from '@/images/naymahHashmi.png';
import portfolio from '@/images/portfolio.png'
import sneakerAlert from '@/images/sneakerAlert.png'
import studybetter from '@/images/studybetter.png'
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/projectsComponents/modal/index.jsx';
const {getProjectData} = require ('./api/data/projectData.js')


function MySwiperComponent() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalSkills, setModalSkills] = useState("");
  
  useEffect(() => {
    fetchData()
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
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
    ; // Fetch data when the component mounts
  }, []);

  async function fetchData() {
    try {
      const data = await getProjectData(); // Fetch project data
      setProjects(data); // Update projects state with fetched data
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  function openModal(name, description, skills) {
    setModalName(name);
    setModalDescription(description);
    setModalSkills(skills);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalName("");
    setModalDescription("");
    setModalSkills("");
  }

  const projectImage=[
    {
      Image: naymahHashmi,
    },
    {
      Image: portfolio,
    },
    {
      Image: studybetter,
    },
    {
      Image: sneakerAlert,
    }
  ]
  console.log(projects)

  return (
    <div className='projectsContainer' id="projects">
      <div><p className='sectionHeader'>Projects</p></div>
      <div className='swiperContainer'>
        <div className="mySwiper">
          <div className="swiper-wrapper">
            {projects.map((project, index) => (
              <div className="swiper-slide" id="myBtn" key={index} >
                <motion.div onClick={() => openModal(project.name, project.description, project.skills)}>
                <Image src={projectImage[index].Image} alt="project"/>
                </motion.div>
                <p className='projectName'>{project.name}</p>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {modalOpen && (
            <Modal
              modalOpen={modalOpen}
              handleClose={closeModal}
              Name={modalName}
              Description={modalDescription}
              Skills={modalSkills}
            />
          )}
        </AnimatePresence>
      </div>
      <div id="projectsBorder"></div>
    </div>
  );
}

export default MySwiperComponent;

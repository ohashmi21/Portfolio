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
  for (let i = 0 ; i < projects.length; i++){
    console.log(projectImage[i].Image)
  }

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

// import React, {useEffect, useState } from 'react';
// import 'swiper/css'; // Import Swiper styles
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import { EffectCoverflow, Pagination } from 'swiper/modules'; // Import Swiper library
// import Swiper from "swiper"
// Swiper.use([EffectCoverflow, Pagination])
// import Image from 'next/image';
// import naymahHashmi from '@/images/naymahHashmi.png';
// import portfolio from '@/images/portfolio.png'
// import sneakerAlert from '@/images/sneakerAlert.png'
// import studybetter from '@/images/studybetter.png'
// import { motion, AnimatePresence } from 'framer-motion';
// import Modal from '@/projectsComponents/modal/index.jsx';
// function MySwiperComponent() {
//   useEffect(() => {
//     // Initialize Swiper when the component mounts
//     const swiper = new Swiper(".mySwiper", {
//       effect: "coverflow",
//       grabCursor: true,
//       centeredSlides: true,
//       slidesPerView: "auto",
//       coverflowEffect: {
//         rotate: 50,
//         stretch: 0,
//         depth: 100,
//         modifier: 1,
//         slideShadows: true,
//       },
//       pagination: {
//         el: ".swiper-pagination",
//       },
//     });
//     // Clean up Swiper instance when the component unmounts
//     return () => {
//       swiper.destroy();
//     };
//   }, []);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalName, setModalName] = useState(""); // State for dynamic project name
//   const [modalDescription, setModalDescription] = useState("");
//   const [modalSkills, setModalSkills] = useState("") // State for dynamic project description

//   const close = () => {
//     setModalOpen(false);
//     setModalName(""); // Clear the name when closing the modal
//     setModalDescription(""); // Clear the description when closing the modal
//     setModalSkills("");
//   };

//   const open = (name, description, skills) => {
//     setModalName(name); // Set the dynamic project name
//     setModalDescription(description); // Set the dynamic project description
//     setModalOpen(true);
//     setModalSkills(skills);
//   };

//   const projects = [
//     {
//       name: "NaymahHashmi.com V2 (In Progress)",
//       description: "Re-designing and developing the portfolio website for an architect. With a few people working on the project, we decided to use agile methodologies, specifically Jira to be able to complete our work efficiently. The website itself will be full stack, planning to use MongoDB as our database. There will be an admin site, with authentication and security, to allow easy modifcations of the website. So far, I have learned and became comfortable with agile methodologies, along with github for code editing.",
//       skills: "Vue, Typescript, MongoDB, HTML, CSS, Jira, GitHub",
//       Image: naymahHashmi,
//     },
//     {
//       name: "Personal Portfolio",
//       description: "Personal portfolio built in Next.js and React.js. Valuable experience providing necessary practice using react along with components. Deployable now, but would like to make full stack in order to update content easily using an admin site. Deployed and hosted on Digital Ocean.",
//       skills: "React.js, Next.js, HTML, CSS, Typescipt",
//       Image: portfolio,
//     },
//     {
//       name:"StudyBetter.",
//       description: "Working on ”Study Better,” a web application built in Vue, aimed at enhancing study productivity and implementing effective studying techniques for students. The application has a a Pomodoro timer and spaced break timer to optimize study sessions and facilitate strategic breaks, improving focus and learning retention. Future developments includes todo-list, powerpoint navigator with a built in blurt technique using either manually scribed notes for the slide, or speech recognition. ",
//       skills:"Vue, Typescript, HTML, CSS, GitHub",
//       Image: studybetter,
//     },
//     {
//       name: "Sneaker Alert",
//       description: "Twiter bot that went through specific twitter accounts to gather data about shoe releases. Stores that information in a csv file, using the pandas library, and the day before the shoe releases, tweets an alert stating that the shoe is going to release. Ran for 2 weeks (4 releases) and reached an audiece of 90 people. Learned data gathering and analysis, along with experience working with api's to fetch and use data.",
//       skills: "Python, tweepy",
//       Image: sneakerAlert,
//     }

//   ];

//   for (let i = 0 ; i<projects.length; i++){
//     console.log(projects[i].Image)
//   }
//   return (
//     <div className='projectsContainer' id="projects">
//       <div><p className='sectionHeader'>Projects</p></div>
//       <div className='swiperContainer'>
//         <div className="mySwiper">
//         <div className="swiper-wrapper">
//         {projects.map((project, index) => (
//         <div className="swiper-slide" id="myBtn" key={index} >
//           <motion.div
//             onClick={() => (modalOpen ? close() : open(project.name, project.description, project.skills))}
//           >
//             <Image src={project.Image} alt="project" />
//             <p className='projectName'>{project.name}</p>
//           </motion.div>
          
//         </div>
//       ))}
      
//         </div>
//         <div className="swiper-pagination"></div>
//         </div>
//         <AnimatePresence
//             initial={false}
//             mode="wait"
//             onExitComplete={() => null}
//           >
//         {modalOpen && (
//               <Modal
//                 modalOpen={modalOpen}
//                 handleClose={close}
//                 Name={modalName}
//                 Description={modalDescription}
//                 Skills={modalSkills}
//               />
//             )}
            
//           </AnimatePresence>
//       </div>
//       <div id="pojectsBorder"></div>
//     </div>
//   );
// }

// export default MySwiperComponent;

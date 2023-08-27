// React Component
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import naymahHashmi from '@/images/naymahHashmi.com.png';
import portfolio from '@/images/portfolio.png';
import sneakerAlert from '@/images/sneakerAlert.png';

interface ProjectData {
  [key: string]: {
    title: string;
    skills: string;
    description: string;
    pic: StaticImageData;
  };
}

function Projects(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<string>('Portfolio');
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleItemClick = (item: string): void => {
    if (selectedItem !== item) {
      setIsEntering(true);
      setTimeout(() => {
        setSelectedItem(item);
        setIsEntering(false);
      }, 500);
    }
  };

  const projectData: ProjectData = {
    Portfolio: {
      title: 'Portfolio',
      skills: 'Skills Used: React.js, Next.js, HTML, CSS, Typescipt',
      description:
        'Personal portfolio built in Next.js and React.js. Valuable experience providing necessary practice using react along with components. Deployable now, but would like to make full stack in order to update content easily using an admin site.',
      pic: portfolio,
    },
    SneakerAlert: {
      title: 'SneakerAlert',
      skills: 'Skills Used: Python, Tweepy',
      description:
        'Twiter bot that went through specific twitter accounts to gather data about shoe releases. Stores that information in a csv file, using the pandas library, and the day before the shoe releases, tweets an alert stating that the shoe is going to release. Ran for 2 weeks (4 releases) and reached an audiece of 90 people. Learned data gathering and analysis, along with getting experience with the twitter api.',
      pic: sneakerAlert,
    },
    'NaymahHashmi.com': {
      title: 'NaymahHashmi.com v2 (In progress)',
      skills: 'Skills Used: Vue, Typescript, MongoDB, HTML, CSS, Jira, GitHub',
      description:
        'Re-designing and developing the portfolio website for an architect. With a few people working on the project, we decided to use agile methodologies, specifically Jira to be able to complete our work efficiently. The website itself will be full stack, using MongoDB as our data. There will be an admin site, with authentication and security, to allow easy modifcations of the website. So far, I have learned and am comfortable with agile methodologies, along with github for code editing. ',
      pic: naymahHashmi,
    },
  };
  
  return (
    <div id="ProjectsContainer">
      <div>
        <p className="sectionHeader">Projects</p>
      </div>
      <ul id="projects">
        <li
          onClick={() => handleItemClick('Portfolio')}
          className={selectedItem === 'Portfolio' ? 'selected' : ''}
        >
          Portfolio
        </li>
        <li
          onClick={() => handleItemClick('SneakerAlert')}
          className={selectedItem === 'SneakerAlert' ? 'selected' : ''}
        ><span>
          SneakerAlert
          </span>
        </li>
        <li
          onClick={() => handleItemClick('NaymahHashmi.com')}
          className={selectedItem === 'NaymahHashmi.com' ? 'selected' : ''}
        >
          NaymahHashmi.com v2
        </li>
      </ul>
      {selectedItem && (
        <div
          id="projectWindow"
          className={`transition ${isEntering ? 'transition-enter' : 'transition-exit'}`}
        >
          <div className='projectText'>
            <h2 id="projectTitle">{projectData[selectedItem].title}</h2>
            <h3 id="projectSkills">{projectData[selectedItem].skills}</h3>
            <p id="projectDescription">{projectData[selectedItem].description}</p>
          </div>
          <Image id="projectImg" alt="placeholder" src={projectData[selectedItem].pic} />
        </div>
      )}
    </div>
  );
}

export default Projects;

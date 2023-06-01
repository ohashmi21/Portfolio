import React, { useState } from 'react';
import Image from 'next/image';
import placeholder from './placeholder.png';

interface ProjectData {
  [key: string]: {
    title: string;
    skills: string;
    description: string;
  };
}

function Projects(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<string | null>("Portfolio");

  const handleItemClick = (item: string): void => {
    setSelectedItem(item)
  };

  const projectData: ProjectData = {
    Portfolio: {
      title: 'Portfolio',
      skills: 'Skills Used: Skill 1, Skill 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    SneakerAlert: {
      title: 'SneakerAlert',
      skills: 'Skills Used: Skill 3, Skill 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    'NaymahHashmi.com': {
      title: 'NaymahHashmi.com',
      skills: 'Skills Used: Skill 5, Skill 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
        >
          SneakerAlert
        </li>
        <li
          onClick={() => handleItemClick('NaymahHashmi.com')}
          className={selectedItem === 'NaymahHashmi.com' ? 'selected' : ''}
        >
          NaymahHashmi.com
        </li>
      </ul>
      {selectedItem && (
        <div id="projectWindow">
          <div id="projectText">
            <h2 id="projectTitle">{projectData[selectedItem].title}</h2>
            <h3 id="projectSkills">{projectData[selectedItem].skills}</h3>
            <p id="projectDescription">{projectData[selectedItem].description}</p>
          </div>
          <Image id="projectImg" alt="placeholder" src={placeholder} />
        </div>
      )}
    </div>
  );
}

export default Projects;

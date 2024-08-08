import TProjects from './projects.jsx';
import TExperience from './experience.jsx';
import TVolunteer from './volunteer.jsx';
import React, { useState} from 'react';
import './styles/homePage.css'
function App() {
  const [visibleContent, setVisibleContent] = useState('Projects');

  const handleShowProjects = () => {
    setVisibleContent("Projects")
  }
  const handleShowExperience = () => {
    setVisibleContent("Experience")
  }
  const handleShowVolunteer = () => {
    setVisibleContent("Volunteer")
  }

  return(
    <body>
      <div>
        <div className='buttonSelector'>
          <p onClick={handleShowProjects} className="button">Projects</p>
          <p onClick={handleShowExperience} className="button">Experience</p>
          <p onClick={handleShowVolunteer} className="button">Volunteer</p>
        </div>
        {visibleContent==="Projects" && (<div><TProjects></TProjects></div>)}
        {visibleContent==="Experience" && (<div><TExperience></TExperience></div>)}
        {visibleContent==="Volunteer" && (<div><TVolunteer></TVolunteer></div>)}
        </div>
    </body>
  )
}

export default App;

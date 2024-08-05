import TProjects from './projects.jsx';
import React, { useState} from 'react';
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
          <p onClick={handleShowProjects}>Projects</p>
          <p onClick={handleShowExperience}>Experience</p>
        </div>
        {visibleContent==="Projects" && (<div><TProjects></TProjects></div>)}
          
        </div>
    </body>
  )
}

export default App;

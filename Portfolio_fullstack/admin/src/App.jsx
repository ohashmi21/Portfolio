import TProjects from './projects.jsx';
import TExperience from './experience.jsx';
import TVolunteer from './volunteer.jsx';
import { useState } from 'react';
import './styles/homePage.css'
function App() {
  const [visibleContent, setVisibleContent] = useState('Projects');
  const tabs = ['Projects', 'Experience', 'Volunteer'];

  return(
      <div className='adminPage'>
        <header className='adminHeader'>
          <h1>Portfolio Admin</h1>
          <p>Manage your public content from one place.</p>
        </header>

        <div className='buttonSelector'>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setVisibleContent(tab)}
              className={`button ${visibleContent === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className='contentContainer'>
          {visibleContent==="Projects" && (<TProjects />)}
          {visibleContent==="Experience" && (<TExperience />)}
          {visibleContent==="Volunteer" && (<TVolunteer />)}
        </section>
      </div>
  )
}

export default App;

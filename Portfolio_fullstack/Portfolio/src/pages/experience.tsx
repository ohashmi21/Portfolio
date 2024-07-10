import React, { useState } from 'react';

export default function App() {
    const [visibleContent, setVisibleContent] = useState("Work");

    const handleShowExperience = () => {
        setVisibleContent("Work");
    };

    const handleShowVolunteer = () => {
        setVisibleContent("Volunteer");
    };

    return (
        <div className='experienceContainer'>
            <h1>Experience</h1>
            <div className='buttonSelector'>
            <p onClick={handleShowExperience}>Work</p>
            <p onClick={handleShowVolunteer}>Volunteer</p>
            </div>
            {visibleContent === "Work" && (
                <div>
                    <h2>Work Experience</h2>
                    <p>Details about your work experience...</p>
                </div>
            )}

            {visibleContent === "Volunteer" && (
                <div>
                    <h2>Volunteer Experience</h2>
                    <p>Details about your volunteer experience...</p>
                </div>
            )}
            
        </div>
    );
}

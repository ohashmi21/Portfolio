import { useRef } from "react";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref: myRef, inView: isVisible} = useInView({
    threshold: .25,
    rootMargin: '200px 0px -200px 0px',
  });
  const { ref: aboutRef, inView: about } = useInView({
    threshold: .25,
    rootMargin: '200px 0px -200px 0px',
  });

  return (
    <div>
      <div id="aboutContainer">
        <div ref={myRef}>
        <div className={`${isVisible ? 'show' : 'hidden'}`} ref={aboutRef}><p className="sectionHeader">About</p></div>
        </div>
        <div className={`${about ? 'paragraphshow' : 'paragraphhidden'}`}>
          <p className="aboutParagraph">I am Omair Hashmi, a sophomore computer scince student at Wayne State University. Exprienced in 
            Python, C++, Javascript, Typescript, HTML, and CSS, along with the Flask, React, Vue, and Next frameworks. With no
            specialization yet, I am open to all internship oppotunities for experience and exposure. <br></br> <br></br>
            When not coding or watching ASMR coding tutorials, I love to play basketball and plan my next trip 
            with my friends. I like to stay informed of the newest technologies and love to see see how software solutions
            are being used in creative ways, and want to be one of the first to learn and use these solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
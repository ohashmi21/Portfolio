import { useRef } from "react";
import { useInView } from "react-intersection-observer";

function About() {
  const { ref: myRef, inView: isVisible} = useInView({
    threshold: .25,
    rootMargin: '55% 0px -50% 0px',
  });
  const { ref: aboutRef, inView: about } = useInView({
    threshold: .25,
    rootMargin: '55% 0px -50% 0px',
  });

  return (
    <div>
      <div className="aboutContainer" id="about">
        <div ref={myRef}>
        <div className={`${isVisible ? 'show' : 'hidden'}`} ref={aboutRef}><p id="sectionHeader">About</p></div>
        </div>
        <div className={`${about ? 'paragraphshow' : 'paragraphhidden'}`}>
          <p className="aboutParagraph " id='paragraph'>I am Omair Hashmi, a Senior computer science student at Wayne State University. Comfortable with a wide range of programming languages, including Python, C++, Javascript, Typescript, HTML, and CSS. I am also well-versed in popular frameworks such as Flask, React, Vue, and Next. Eager to explore all internship opportunities that can further expand my skills and offer meaningful work experiences, particularly software development or cybersecurity.
          <br></br>
          <br></br>

          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

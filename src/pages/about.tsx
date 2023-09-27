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
      <div className="aboutContainer" id="about">
        <div ref={myRef}>
        <div className={`${isVisible ? 'show' : 'hidden'}`} ref={aboutRef}><p id="sectionHeader">About</p></div>
        </div>
        <div className={`${about ? 'paragraphshow' : 'paragraphhidden'}`}>
          <p className="aboutParagraph " id='paragraph'>I am Omair Hashmi, a Junior computer science student at Wayne State University. Currently gaining valuable experience working a technical coop position with Denso International. Comfortable with a wide range of programming languages, including Python, C++, Javascript, Typescript, HTML, and CSS. I am also well-versed in popular frameworks such as Flask, React, Vue, and Next. Eager to explore all internship opportunities that can further expand my skills and offer meaningful work experiences, particularly software development or cybersecurity.
          <br></br>
          <br></br>

<span id="optionalText">Beyond my passion for coding, I have a deep love for basketball and enjoy planning exciting trips with friends. Staying abreast of the latest technological advancements is a personal interest of mine, and I find great inspiration in discovering how software solutions are creatively applied in various domains. I aspire to be at the forefront of this ever-evolving field, eagerly seeking opportunities to learn and contribute to innovative solutions.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

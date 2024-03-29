import Image from "next/image";
import resume from "@/images/resume.png";
import linkedin from "@/images/linkedin.png";
import github from "@/images/github.png";

export default function Contact() {
  return (
    <div id="contactContainer">
      <p className="sectionHeader" >Contact</p>
      <div className="linksgrid">
        <div className="linksflex">
          <Image className="linkedinimg" alt="LinkedIn Image" src={linkedin} />
          <a href="https://www.linkedin.com/in/omair-hashmi/" className="linkedin" target="_blank" rel="noopener noreferrer">Linkedin</a>
        </div>
        <div className="linksflex">
          <Image className="resumeimg" alt="resume image" src={resume} />
          <a href="Omair_Hashmi_Resume.pdf" className="resume" download="Omair_Hashmi_Resume.pdf">Resume</a>
        </div>
        <div className="linksflex"> 
          <Image className="githubimg" alt="Github image" src={github} /> 
          <a href="https://github.com/ohashmi21" target="_blank" className="github" rel="noopener noreferrer">Github</a>
        </div>
        </div>
      </div>
  );
}

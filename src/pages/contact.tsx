import Image from "next/image";
import resume from "@/images/resume.png";
import linkedin from "@/images/linkedin.png";
import github from "@/images/github.png";

export default function Contact() {
  return (
    <div>
      <p className="sectionHeader" id="contactContainer">Contact</p>
      <div className="linksgrid">
        <div className="linksflex">
          <Image className="linkedinimg" alt="LinkedIn Image" src={linkedin} />
          <a href="https://www.linkedin.com/in/omair-hashmi/" className="linkedin" target="_blank" rel="noopener noreferrer">Linkedin</a>
        </div>
        <div className="linksflex">
          <Image className="resumeimg" alt="resume image" src={resume} />
          <a href="Omair_Hashmi_Resume.pdf" className="resume" download="Omair_Hashmi_Resume.pdf">Resume</a>
        </div>
      </div>
    </div>
  );
}

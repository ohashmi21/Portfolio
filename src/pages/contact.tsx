import Image from "next/image"
import resume from "./resume.png"
import linkedin from "./linkedin.png"
import github from "./github.png"


export default function Contact(){
    return(
        <div>
            <p className="sectionHeader" id="contactContainer">Contact</p>
                <div className="linksgrid"> 
                    <div className="linksflex">
                        <Image className="linkedinimg" alt="LinkedIn Image" src={linkedin}/>
                        <a href="https:/www.linkedin.com/in/omair-hashmi-33310619a" className="linkedin" target="_blank">Linkedin</a>
                    </div>
                    <div className="linksflex">
                            <Image className="resumeimg" alt="resume image" src={resume}/>
                            <a href="" className="resume" download>Resume</a>
                    </div>
                    <div className="linksflex">
                        <Image className="githubimg" alt="Github image" src={github}/>
                        <a href="https://github.com/ohashmi21" className="github">Github</a>
                    </div>
                </div>
            </div>
            
    )
} 
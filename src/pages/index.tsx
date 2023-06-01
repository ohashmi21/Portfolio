import Navbar from "./nav"
import Intro from "./intro"
import About from "./about"
import Projects from "./projects"
import Contact from "./contact"
import Footer from "./footer"


export default function Home() {
  return (
    
    <body>
      <div>
      
      <div><Intro></Intro></div>
      <div><About></About></div>
      <div><Projects></Projects></div>
      <div><Contact></Contact></div>
      <div><Navbar></Navbar></div>
      <div><Footer></Footer></div>
      </div>
    </body>
  )
}

import Navbar from "./nav"
import Intro from "./intro"
import About from "./about"
import Projects from "./projects"
import Contact from "./contact"
import Footer from "./footer"
import Experience from "./experience"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

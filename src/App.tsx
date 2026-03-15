import { UniverseScene } from './components/UniverseScene'
import CyberNav from './components/CyberNav'
import { Hero } from './components/Hero'
import About from './components/About'
import AboutSection from './components/About_Section'
import SkillsSection from './components/Skills_Section'
import ProjectsSection from './components/Projects_section'
import ContactSection from './components/ContactSection'
import { useEffect } from 'react'


const App = () => {

  useEffect(() => {
    const glow = document.querySelector(".cursor-glow") as HTMLElement
    const dot = document.querySelector(".cursor-dot") as HTMLElement

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      glow.style.left = mouseX + "px"
      glow.style.top = mouseY + "px"
    })

    const animate = () => {
      dotX += (mouseX - dotX) * 0.1
      dotY += (mouseY - dotY) * 0.1
      dot.style.left = dotX + "px"
      dot.style.top = dotY + "px"
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    
    <div>
      <UniverseScene />

      {/* Dark overlay */}
  <div className="bg-overlay"></div>

      <div className="grid-overlay"></div>
      <div className="japanese-layer"></div>
      <div className="cursor-glow"></div>
      <div className="cursor-dot"></div>
      
      <CyberNav />
      <Hero />
      <About />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
    </div>
    
  )
}

export default App
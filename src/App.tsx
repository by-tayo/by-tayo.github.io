import Hero from './components/Hero'
import About from './components/About'
import Tools from './components/Tools'
import Experience from './components/Experience'
import Leadership from './components/Leadership'
import Research from './components/Research'
import Events from './components/Events'
import Works from './components/Works'
import Writeups from './components/Writeups'
import Contact from './components/Contact'
import ThemeToggle from './components/ThemeToggle'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <Hero />
      <About />
      <Tools />
      <Experience />
      <Works />
      <Events />
      <Leadership />
      <Research />
      <Writeups />
      <Contact />
    </>
  )
}

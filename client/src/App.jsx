import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { TechMarquee } from './components/TechMarquee.jsx';
import { About } from './components/About.jsx';
import { Projects } from './components/Projects.jsx';
import { Stack } from './components/Stack.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="site-grain" aria-hidden="true" />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

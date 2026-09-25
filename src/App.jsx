import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Process from './components/Process.jsx';
import Workbench from './components/Workbench.jsx';
import BuildLog from './components/BuildLog.jsx';
import Principles from './components/Principles.jsx';
import BriefComposer from './components/BriefComposer.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Process />
        <Workbench />
        <BuildLog />
        <Principles />
        <BriefComposer />
      </main>
      <Footer />
    </>
  );
}

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import ClientLogos from './sections/ClientLogos';
import About from './sections/About';
import Services from './sections/Services';
import Cases from './sections/Cases';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ServiceDetail from './sections/ServiceDetail';
import './index.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Home page component
const HomePage = () => (
  <>
    <Navigation />
    <main>
      <section id="hero">
        <Hero />
      </section>
      <ClientLogos />
      <About />
      <Services />
      <Cases />
      <Process />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

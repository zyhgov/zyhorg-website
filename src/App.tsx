import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/sections/HeroCarousel';
import AboutSection from '@/components/sections/AboutSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsVisualization from '@/components/sections/SkillsVisualization';
import MapSection from '@/components/sections/MapSection';
import ContactSection from '@/components/sections/ContactSection';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-apple-gray1">
      <Header />
      <main>
        <HeroCarousel />
        <AboutSection />
        <PartnersSection />
        <ProjectsSection />
        <SkillsVisualization />
        <MapSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
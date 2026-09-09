import React from 'react';
import useScrollReveal from './hooks/useScrollReveal';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import Intro from './components/Intro';
import SCOSection from './components/SCOSection';
import WhySCO from './components/WhySCO';
import Location from './components/Location';
import Amenities from './components/Amenities';
import FloorBreakdown from './components/FloorBreakdown';
import SitePlan from './components/SitePlan';
import CompetitiveAnalysis from './components/CompetitiveAnalysis';
import Connectivity from './components/Connectivity';
import Neighbourhood from './components/Neighbourhood';
import Businesses from './components/Businesses';
import NewAgeFeatures from './components/NewAgeFeatures';
import WealthCreation from './components/WealthCreation';
import SiteProgress from './components/SiteProgress';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import BackToTop from './components/BackToTop';
import ImageMorphGallery from './components/ImageMorphGallery';
import SkylineScrollReveal from './components/SkylineScrollReveal';

export default function App() {
  // Activate scroll reveal observer
  useScrollReveal(0.14);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <div id="overview">
          <Intro />
          <SCOSection />
        </div>
        <ImageMorphGallery />
        <WhySCO />
        <Location />
        <Amenities />
        <FloorBreakdown />
        <SitePlan />
        <CompetitiveAnalysis />
        <Connectivity />
        <Neighbourhood />
        <SkylineScrollReveal />
        <Businesses />
        <NewAgeFeatures />
        <WealthCreation />
        <SiteProgress />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <BackToTop />
    </>
  );
}

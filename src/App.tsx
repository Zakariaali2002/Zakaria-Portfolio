import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundEffects from "./components/BackgroundEffects";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import LoadingScreen from "./components/LoadingScreen";
import KeyboardNav from "./components/KeyboardNav";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  useTheme();

  return (
    <>
      <LoadingScreen />
      <BackgroundEffects />
      <CustomCursor />
      <CommandPalette />
      <KeyboardNav />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <ExperienceTimeline />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
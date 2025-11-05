import Hero from "../components/Hero";
import About from "../components/About";
import ExperienceList from "../components/ExperienceList";
import EducationTimeline from "../components/EducationTimeLine";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceList />
      <EducationTimeline />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

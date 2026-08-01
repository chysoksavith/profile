import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Languages from '@/components/Languages';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl px-6">
        <Hero />

        <div className="reveal space-y-16 pb-24" style={{ animationDelay: '120ms' }}>
          <Experience />
          <Projects />
          <Skills />

          <div className="grid gap-10 sm:grid-cols-2">
            <Education />
            <Languages />
          </div>

          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}

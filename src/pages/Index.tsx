import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-red-500 text-white p-8">
      <h1 className="text-4xl font-bold">TEST - Ez látható?</h1>
      <div className="bg-blue-500 p-4 mt-4">
        <p>Ha ezt látod, akkor a Tailwind működik</p>
        <div style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', padding: '1rem', marginTop: '1rem' }}>
          CSS változók teszt - Corporate narancs
        </div>
      </div>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Statistics />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

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
    <div className="min-h-screen">
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

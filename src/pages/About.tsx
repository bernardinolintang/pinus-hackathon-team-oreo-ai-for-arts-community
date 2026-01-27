import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            About Atelier
          </h1>
          <p className="text-muted-foreground mb-6">
            Atelier is a community-driven art platform built on trust,
            transparency, and genuine appreciation.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;



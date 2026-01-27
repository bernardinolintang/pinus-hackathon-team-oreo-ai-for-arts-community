import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Trust = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Trust &amp; Safety
          </h1>
          <p className="text-muted-foreground mb-6">
            How we keep Atelier safe, transparent, and respectful for artists
            and collectors.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trust;



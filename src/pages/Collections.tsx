import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Collections
          </h1>
          <p className="text-muted-foreground mb-6">
            Curated sets of artworks will appear here so you can explore themes,
            moods, and stories across multiple pieces.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;



import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Community Guidelines
          </h1>
          <p className="text-muted-foreground mb-6">
            Learn how to participate respectfully and constructively in the
            Atelier community.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guidelines;



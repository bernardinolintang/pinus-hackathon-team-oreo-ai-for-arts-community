import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistsSection from "@/components/ArtistsSection";

const Artists = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <ArtistsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Artists;



import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ReportDialog } from "@/components/ReportDialog";
import { ArtistHeader } from "@/components/artist-profile/ArtistHeader";
import { ArtistBio } from "@/components/artist-profile/ArtistBio";
import { TrustSignals } from "@/components/artist-profile/TrustSignals";
import { ArtworkGallery } from "@/components/artist-profile/ArtworkGallery";
import { fetchArtistProfile } from "@/api/artists";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const artistId = id ?? "";

  const { data: artist, isLoading, error } = useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => fetchArtistProfile(artistId),
    enabled: !!artistId,
  });

  useDocumentTitle(artist?.name ?? "Artist");

  if (!artistId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold mb-4">No artist selected</h1>
            <Link to="/discover">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Discover
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
            <div className="flex gap-6 mb-8">
              <div className="h-32 w-32 rounded-full bg-muted animate-pulse shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-10 w-64 bg-muted rounded animate-pulse" />
                <div className="h-5 w-48 bg-muted rounded animate-pulse" />
                <div className="h-9 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-48 bg-muted rounded-2xl animate-pulse" />
                <div className="h-64 bg-muted rounded-2xl animate-pulse" />
              </div>
              <div className="h-48 bg-muted rounded-2xl animate-pulse" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold mb-4">Artist not found</h1>
            <p className="text-muted-foreground mb-6">
              The artist you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link to="/discover">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Discover
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <ArtistHeader artist={artist} showBackLink />
            <div className="mt-4 flex justify-end">
              <ReportDialog
                context="profile"
                targetId={String(artist.id)}
                targetLabel={artist.name}
                trigger={
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Report this profile
                  </Button>
                }
              />
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <ArtistBio artist={artist} />
              <ArtworkGallery
                artistId={artist.id}
                artworks={artist.artworks}
                paginate={artist.artworks.length > 12}
              />
            </div>
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <TrustSignals signals={artist.trustSignals} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

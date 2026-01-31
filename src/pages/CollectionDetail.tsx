import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Heart, BadgeCheck, Calendar, ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getCollectionById } from "@/data/collections";
import { format } from "date-fns";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const CollectionDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const collection = id ? getCollectionById(id) : undefined;

  const displayTitle = collection ? t(`collections.items.${collection.id}.title`, { defaultValue: collection.title }) : t("collections.title");
  useDocumentTitle(displayTitle);

  if (!collection) {
    return <Navigate to="/collections" replace />;
  }

  const {
    title,
    description,
    theme,
    mood,
    coverImage,
    artworkCount,
    followersCount,
    peerEndorsements,
    createdAt,
    curator,
    featuredImages = [],
  } = collection;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/collections">{t("collections.title")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{displayTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-card mb-8"
          >
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <img
                src={coverImage}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
                    {theme}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
                    {mood}
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
                  {displayTitle}
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Meta & curator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={curator.avatar} alt={curator.name} />
                <AvatarFallback>
                  {curator.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">{t("collectionDetail.curatedBy")}</p>
                <p className="font-medium flex items-center gap-1.5">
                  {curator.name}
                  {curator.verified && (
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {t("collectionDetail.created")} {format(new Date(createdAt), "MMMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {followersCount.toLocaleString()} {t("collectionDetail.followers")}
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                {peerEndorsements} {t("collectionDetail.endorsements")}
              </span>
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                {artworkCount} {t("collectionDetail.works")}
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="font-serif text-xl font-semibold mb-3">{t("collectionDetail.aboutCollection")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t(`collections.items.${collection.id}.description`, { defaultValue: description })}</p>
          </motion.section>

          {/* Featured works */}
          {featuredImages.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h2 className="font-serif text-xl font-semibold mb-4">
                Featured works
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                A selection of artworks from this collection. Browse all {artworkCount} works on Discover.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {featuredImages.map((src, index) => (
                  <Link
                    key={`${src}-${index}`}
                    to="/discover"
                    className="group block aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/discover">
                  <Button variant="outline" size="sm">
                    {t("collectionDetail.exploreMore")}
                  </Button>
                </Link>
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionDetail;

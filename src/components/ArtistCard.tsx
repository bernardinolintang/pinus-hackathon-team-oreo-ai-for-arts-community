import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star, Users, Award } from "lucide-react";

interface ArtistCardProps {
  id?: string;
  name: string;
  avatar: string;
  specialty: string;
  reputation: "established" | "rising" | "newcomer";
  followers: number;
  peerEndorsements: number;
  recentWork: string;
  delay?: number;
}

const ArtistCard = ({
  id,
  name,
  avatar,
  specialty,
  reputation,
  followers,
  peerEndorsements,
  recentWork,
  delay = 0,
}: ArtistCardProps) => {
  const { t } = useTranslation();
  const reputationColors = {
    established: "trust-badge",
    rising: "peer-badge",
    newcomer: "organic-badge",
  };

  const reputationLabels = {
    established: t("artists.reputationEstablished"),
    rising: t("artists.reputationRising"),
    newcomer: t("artists.reputationNewcomer"),
  };

  // Generate id from name if not provided
  const artistId = id || name.toLowerCase().replace(/\s+/g, "-");

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
    >
      {/* Background image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={recentWork}
          alt={t("artists.recentWorkAlt")}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="relative px-5 -mt-12">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full border-4 border-card object-cover shadow-soft"
        />
      </div>

      {/* Content */}
      <div className="p-5 pt-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif text-xl font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
          </div>
          <span className={reputationColors[reputation]}>
            <Award className="w-3 h-3" />
            {reputationLabels[reputation]}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{followers.toLocaleString()} {t("artists.followers")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" />
            <span>{peerEndorsements} {t("artists.endorsements")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Link to={`/artists/${artistId}`}>
      {CardContent}
    </Link>
  );
};

export default ArtistCard;

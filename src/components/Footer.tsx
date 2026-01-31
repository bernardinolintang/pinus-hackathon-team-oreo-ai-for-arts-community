import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-12 md:py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-trust" />
              <span className="font-serif text-lg sm:text-xl font-semibold">{t("common.appName")}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.communityTrust")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/community" className="hover:text-foreground transition-colors">{t("footer.community")}</Link></li>
              <li><Link to="/guidelines" className="hover:text-foreground transition-colors">{t("footer.guidelines")}</Link></li>
              <li><Link to="/trust" className="hover:text-foreground transition-colors">{t("footer.trust")}</Link></li>
              <li><Link to="/moderation" className="hover:text-foreground transition-colors">{t("footer.moderation")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">{t("footer.faq")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("footer.about")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">{t("footer.ourMission")}</Link></li>
              <li><Link to="/principles" className="hover:text-foreground transition-colors">{t("footer.principles")}</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

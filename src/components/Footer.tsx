import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-trust" />
              <span className="font-serif text-xl font-semibold">Atelier</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A community-driven art platform built on trust, transparency, and genuine appreciation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community & Trust</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
              <li><Link to="/guidelines" className="hover:text-foreground transition-colors">Guidelines</Link></li>
              <li><Link to="/trust" className="hover:text-foreground transition-colors">Trust & Safety</Link></li>
              <li><Link to="/moderation" className="hover:text-foreground transition-colors">Moderation</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">Our Mission</Link></li>
              <li><Link to="/principles" className="hover:text-foreground transition-colors">Ethical Principles</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Atelier. Building trust in art communities.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  height?: string;
}

const Logo = ({ className = "", height = "h-8" }: LogoProps) => (
  <Link to="/" className={`flex items-center hover:opacity-80 transition-opacity shrink-0 ${className}`} aria-label="Atelier - Home">
    <img
      src="/atelier-logo.svg"
      alt="Atelier"
      className={`${height} w-auto object-contain`}
    />
  </Link>
);

export default Logo;

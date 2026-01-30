import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  /** Optional label for screen readers (default: "Loading") */
  label?: string;
  className?: string;
  /** Size: "sm" | "default" | "lg" */
  size?: "sm" | "default" | "lg";
}

const sizeClasses = {
  sm: "w-5 h-5 border-2",
  default: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-2",
};

/**
 * Accessible loading spinner: role="status", aria-live="polite", and sr-only text
 * so screen readers announce "Loading" (or custom label).
 */
const LoadingSpinner = ({ label = "Loading", className, size = "default" }: LoadingSpinnerProps) => (
  <div
    className={cn("flex flex-col items-center justify-center gap-2", className)}
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div
      className={cn("rounded-full border-primary border-t-transparent animate-spin", sizeClasses[size])}
      aria-hidden
    />
    <span className="sr-only">{label}</span>
  </div>
);

export default LoadingSpinner;

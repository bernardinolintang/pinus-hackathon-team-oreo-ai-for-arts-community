import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const themeOptions: { value: ThemeOption; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "light", label: "Light", icon: <Sun className="w-5 h-5" />, description: "Always use light mode" },
  { value: "dark", label: "Dark", icon: <Moon className="w-5 h-5" />, description: "Always use dark mode" },
  { value: "system", label: "System", icon: <Monitor className="w-5 h-5" />, description: "Match your device setting" },
];

const Settings = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme as ThemeOption) || "system";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground mb-10">
              Manage your account and preferences.
            </p>

            {/* Appearance */}
            <section className="mb-12">
              <Label className="text-base font-medium mb-4 block">Appearance</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how Atelier looks. You can pick a theme or use your system preference.
              </p>
              {mounted ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {themeOptions.map((option) => {
                    const isSelected = currentTheme === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTheme(option.value)}
                        className={cn(
                          "relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                          "hover:border-primary/50 hover:bg-muted/50",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-muted/50 text-muted-foreground"
                          )}
                        >
                          {option.icon}
                        </span>
                        <div className="w-full text-center">
                          <p className="font-medium text-sm">{option.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {themeOptions.map((option) => (
                    <div
                      key={option.value}
                      className="h-36 rounded-xl border border-border bg-card animate-pulse"
                    />
                  ))}
                </div>
              )}
              {mounted && currentTheme === "system" && (
                <p className="text-xs text-muted-foreground mt-3">
                  Currently using {resolvedTheme === "dark" ? "dark" : "light"} mode based on your system.
                </p>
              )}
            </section>

            {/* Divider for future sections */}
            <div className="border-t border-border pt-8">
              <Label className="text-base font-medium mb-2 block text-muted-foreground">
                Account
              </Label>
              <p className="text-sm text-muted-foreground">
                Profile and security settings are available from your{" "}
                <Link to="/profile" className="text-primary hover:underline">
                  profile page
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;

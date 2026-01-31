import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Palette } from "lucide-react";

const SignupArtist = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("signupArtist.toastPasswordsMatch"));
      return;
    }

    if (password.length < 6) {
      toast.error(t("signupArtist.toastPasswordLength"));
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name, true);
      toast.success(t("signupArtist.toastSuccess"));
      // Navigation happens in AuthContext after signup
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("signupArtist.toastFailed"));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="fixed inset-0 bg-background z-40 flex items-center justify-center pt-16 pb-16 px-6">
        <Card className="w-full max-w-md relative z-50">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl font-serif">{t("signupArtist.title")}</CardTitle>
            </div>
            <CardDescription>
              {t("signupArtist.description")}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("signupArtist.fullName")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("login.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("signupArtist.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("signupArtist.creating") : t("signupArtist.register")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {t("signupArtist.wantRegular")}{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  {t("signupArtist.signupWithout")}
                </Link>
              </p>
              <p className="text-sm text-center text-muted-foreground">
                {t("signupArtist.alreadyHave")}{" "}
                <Link to="/login" className="text-primary hover:underline">
                  {t("common.signIn")}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupArtist;

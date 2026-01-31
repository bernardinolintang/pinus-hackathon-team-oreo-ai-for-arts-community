import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from "@/components/Header";
import { getUserMessage } from "@/lib/errors";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/discover", { replace: true });
    } catch (error) {
      toast.error(getUserMessage(error, "login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="fixed inset-0 bg-background z-40 flex items-center justify-center pt-16 pb-16 px-4 sm:px-6 overflow-y-auto">
        <Card className="w-full max-w-md relative z-50 my-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-serif">{t("login.title")}</CardTitle>
            <CardDescription>{t("login.description")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
                {loading ? t("login.signingIn") : t("login.submit")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {t("login.noAccount")}{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  {t("common.signUp")}
                </Link>
              </p>
              <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-center">
                <p className="text-xs font-medium text-muted-foreground mb-1">{t("login.demoHint")}</p>
                <p className="text-sm text-foreground font-mono">{t("login.demoCreds")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("login.demoDesc")}</p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;


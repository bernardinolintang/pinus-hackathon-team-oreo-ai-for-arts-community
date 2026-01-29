import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Palette, Clock, XCircle, CheckCircle, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, deleteAccount } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      setDeleteDialogOpen(false);
      toast.success("Your account has been deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-muted/40 via-background to-background">
        <Header />
        <div className="pt-24 pb-20 px-6">
          <div className="container mx-auto max-w-3xl">
            {/* Profile hero */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden mb-8 shadow-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="relative px-6 sm:px-8 py-10 sm:py-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                  <Avatar className="w-28 h-28 sm:w-32 sm:h-32 ring-4 ring-background/80 shadow-lg shrink-0">
                    <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                    <AvatarFallback className="text-3xl font-serif bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                      {user.name}
                    </h1>
                    <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            {user.bio && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="mb-8"
              >
                <Card className="border-border/80 shadow-soft overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {user.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Artist status */}
            {(user.artistApplicationStatus || user.role === "artist") && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-8"
              >
                <Card className="border-border/80 shadow-soft overflow-hidden bg-gradient-to-br from-primary/[0.06] to-transparent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Artist status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {user.role === "artist" ? (
                      <>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                          You are an approved artist. You can post artworks and see who liked and commented on your work.
                        </p>
                        <Button asChild variant="secondary" size="sm" className="mt-1">
                          <Link to="/artist/dashboard">Artist dashboard</Link>
                        </Button>
                      </>
                    ) : user.artistApplicationStatus === "pending" ? (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        Your artist request is pending moderator approval.
                      </p>
                    ) : user.artistApplicationStatus === "rejected" ? (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive shrink-0" />
                        Your artist application was not approved.
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Actions */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Card className="border-border/80 shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Account</CardTitle>
                  <CardDescription>Edit your profile or manage your account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button asChild variant="default" size="default" className="shadow-soft">
                    <Link to="/profile/edit" className="inline-flex items-center gap-2">
                      <Pencil className="w-4 h-4" />
                      Edit profile
                    </Link>
                  </Button>
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="default"
                        className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete account</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleting}
                        >
                          {deleting ? "Deleting…" : "Delete account"}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;

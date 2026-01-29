import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, UserPlus, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { Notification } from "@/components/NotificationsDropdown";

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    message: "liked your artwork",
    userName: "Sarah Williams",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    artworkId: "urban-solitude-1",
    artworkTitle: "Urban Solitude",
    actorId: "sarah-williams",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: "2",
    type: "comment",
    message: "commented on",
    userName: "Marcus Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    artworkId: "morning-light-3",
    artworkTitle: "Morning Light Series III",
    actorId: "marcus-chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: "3",
    type: "follow",
    message: "started following you",
    userName: "Elena Vance",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    actorId: "elena-vance",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
  },
];

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "like": return <Heart className="w-4 h-4" />;
    case "comment": return <MessageCircle className="w-4 h-4" />;
    case "follow": return <UserPlus className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
}

function getLink(n: Notification): string {
  if (n.artworkId) return `/artworks/${n.artworkId}`;
  if (n.actorId) return `/artists/${n.actorId}`;
  if (n.collectionId) return `/collections/${n.collectionId}`;
  return "/discover";
}

const Notifications = () => {
  useDocumentTitle("Notifications");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h1 className="font-serif text-3xl font-semibold flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No notifications yet.</p>
          ) : (
            <ul className="space-y-1">
              {notifications.map((n) => (
                <li key={n.id}>
                  <Link
                    to={getLink(n)}
                    className={`flex gap-4 p-4 rounded-xl transition-colors hover:bg-muted/50 ${!n.read ? "bg-primary/5" : ""}`}
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={n.userAvatar} alt={n.userName} />
                      <AvatarFallback>{n.userName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{n.userName}</span>{" "}
                        <span className="text-muted-foreground">{n.message}</span>
                        {n.artworkTitle && (
                          <span className="font-medium"> {n.artworkTitle}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="shrink-0 text-muted-foreground">{getIcon(n.type)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;

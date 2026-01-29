import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  message: string;
  userAvatar?: string;
  userName: string;
  artworkId?: string;
  artworkTitle?: string;
  actorId?: string;
  collectionId?: string;
  createdAt: string;
  read: boolean;
}

// Mock notifications - in real app, this would come from API
const mockNotifications: Notification[] = [
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

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart className="w-3.5 h-3.5" />;
    case "comment":
      return <MessageCircle className="w-3.5 h-3.5" />;
    case "follow":
      return <UserPlus className="w-3.5 h-3.5" />;
    default:
      return <Bell className="w-3.5 h-3.5" />;
  }
};

const getNotificationIconBg = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    case "comment":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "follow":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface NotificationsDropdownProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const NotificationsDropdown = ({
  notifications = mockNotifications,
  unreadCount = mockNotifications.filter((n) => !n.read).length,
}: NotificationsDropdownProps) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationUrl = (notification: Notification): string => {
    if (notification.artworkId) return `/artworks/${notification.artworkId}`;
    if (notification.collectionId) return `/collections/${notification.collectionId}`;
    if (notification.actorId) return `/artists/${notification.actorId}`;
    return "/discover";
  };

  const handleNotificationClick = () => {
    setIsOpen(false);
  };

  const unreadCountLocal = localNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
          aria-label={`Notifications${unreadCountLocal > 0 ? `, ${unreadCountLocal} unread` : ""}`}
        >
          <Bell className="w-5 h-5" />
          {unreadCountLocal > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground"
              aria-hidden
            >
              {unreadCountLocal > 99 ? "99+" : unreadCountLocal}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[360px] p-0 rounded-xl shadow-lg border"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div>
            <h3 className="font-semibold text-sm">Notifications</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {unreadCountLocal > 0
                ? `${unreadCountLocal} unread`
                : "All caught up"}
            </p>
          </div>
          {unreadCountLocal > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead();
              }}
              className="text-xs h-8 text-primary hover:text-primary hover:bg-primary/10"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* List */}
        <ScrollArea className="h-[320px]">
          {localNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
              <div className="rounded-full bg-muted p-4 mb-3">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">No notifications</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                When someone likes, comments, or follows you, it will show up here.
              </p>
            </div>
          ) : (
            <div className="py-1">
              {localNotifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={getNotificationUrl(notification)}
                  onClick={() => {
                    markAsRead(notification.id);
                    handleNotificationClick();
                  }}
                  className={cn(
                    "relative w-full flex items-start gap-3 px-4 py-3 pl-4 text-left transition-colors no-underline text-foreground",
                    "hover:bg-muted/60 active:bg-muted/80",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    "border-b border-border/50 last:border-b-0",
                    !notification.read && "bg-primary/[0.04] dark:bg-primary/[0.06]",
                    !notification.read && "pl-5"
                  )}
                  aria-label={`${notification.userName} ${notification.message}${notification.artworkTitle ? ` ${notification.artworkTitle}` : ""}. ${formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}`}
                >
                  {/* Unread indicator bar */}
                  {!notification.read && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary"
                      aria-hidden
                    />
                  )}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Avatar className="h-10 w-10 shrink-0 ring-2 ring-background">
                      <AvatarImage src={notification.userAvatar} alt="" />
                      <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                        {notification.userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm leading-snug">
                        <span className="font-medium text-foreground">
                          {notification.userName}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          {notification.message}
                          {notification.artworkTitle ? " " : ""}
                        </span>
                        {notification.artworkTitle && (
                          <span className="font-medium text-foreground block mt-0.5 truncate">
                            "{notification.artworkTitle}"
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 flex h-7 w-7 items-center justify-center rounded-full",
                        getNotificationIconBg(notification.type)
                      )}
                      aria-hidden
                    >
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {localNotifications.length > 0 && (
          <div className="border-t bg-muted/20 px-3 py-2">
            <Link
              to="/discover"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-lg py-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              View all activity
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;

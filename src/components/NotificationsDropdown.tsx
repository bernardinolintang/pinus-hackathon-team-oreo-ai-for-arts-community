import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Heart, MessageCircle, UserPlus, X, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  message: string;
  userAvatar?: string;
  userName: string;
  artworkId?: string;
  artworkTitle?: string;
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
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: "3",
    type: "follow",
    message: "started following you",
    userName: "Elena Vance",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "like":
      return <Heart className="w-4 h-4 text-red-500" />;
    case "comment":
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case "follow":
      return <UserPlus className="w-4 h-4 text-green-500" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

interface NotificationsDropdownProps {
  notifications?: Notification[];
  unreadCount?: number;
}

const NotificationsDropdown = ({ 
  notifications = mockNotifications,
  unreadCount = mockNotifications.filter((n) => !n.read).length 
}: NotificationsDropdownProps) => {
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const unreadCountLocal = localNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="w-5 h-5" />
          {unreadCountLocal > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
              {unreadCountLocal > 9 ? "9+" : unreadCountLocal}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCountLocal > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-7 text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px]">
          {localNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="py-2">
              {localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-b-0 ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    setIsOpen(false);
                    if (notification.artworkId) {
                      navigate(`/artwork/${notification.artworkId}`);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={notification.userAvatar} alt={notification.userName} />
                      <AvatarFallback>{notification.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{notification.userName}</span>{" "}
                            {notification.message}{" "}
                            {notification.artworkTitle && (
                              <span className="font-medium">"{notification.artworkTitle}"</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {localNotifications.length > 0 && (
          <div className="border-t px-4 py-2">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/notifications">View all notifications</Link>
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;


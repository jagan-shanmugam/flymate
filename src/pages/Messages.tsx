import { motion } from "framer-motion";
import { MessageSquare, UserPlus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  user: string;
  preview: string;
  time: string;
  unread: boolean;
}

const Messages = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const messages: Message[] = [
    {
      id: 1,
      user: "Sarah Parker",
      preview: "Hi! I saw we're on the same flight to NYC...",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      user: "Mike Johnson",
      preview: "Thanks for the airport tips!",
      time: "1h ago",
      unread: false,
    },
    {
      id: 3,
      user: "Emma Wilson",
      preview: "Would love to share a ride to the airport",
      time: "3h ago",
      unread: true,
    },
  ];

  const filteredMessages = messages.filter((message) =>
    message.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = () => {
    toast({
      title: "Connection Request Sent",
      description: "We'll notify you when they respond.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold mb-2">Messages</h1>
          <p className="text-primary-100">Connect with fellow travelers</p>
        </motion.div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{message.user}</h3>
                    <p className="text-sm text-gray-600">{message.preview}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{message.time}</div>
              </div>
              {message.unread && (
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    New message
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={handleConnect}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Messages;
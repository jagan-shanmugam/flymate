import { motion } from "framer-motion";
import { MessageSquare, Users, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForumPost {
  id: number;
  username: string;
  title: string;
  content: string;
  replies: number;
  timestamp: string;
}

interface FlightConnection {
  id: number;
  username: string;
  flight: string;
  date: string;
  destination: string;
}

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      username: "FirstTimer",
      title: "What to pack in carry-on?",
      content: "I'm flying for the first time next week. What essentials should I pack in my carry-on bag?",
      replies: 5,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      username: "TravelNewbie",
      title: "Security check process",
      content: "Can someone explain what happens during the security check? I'm a bit nervous.",
      replies: 8,
      timestamp: "1 day ago"
    }
  ];

  const flightConnections: FlightConnection[] = [
    {
      id: 1,
      username: "Sarah",
      flight: "AA1234",
      date: "Mar 15, 2024",
      destination: "New York (JFK)"
    },
    {
      id: 2,
      username: "Mike",
      flight: "UA5678",
      date: "Mar 16, 2024",
      destination: "Los Angeles (LAX)"
    }
  ];

  return (
    <div className="container px-4 py-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-foreground">Community</h1>

        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Flight Connections
            </TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions or flights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="forum">
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary">@{post.username}</span>
                      <Button variant="outline" size="sm">
                        {post.replies} replies
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <div className="space-y-4">
              {flightConnections.map((connection) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">Flight {connection.flight}</h3>
                        <p className="text-sm text-muted-foreground">{connection.destination}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{connection.date}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-primary">@{connection.username}</span>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Community;
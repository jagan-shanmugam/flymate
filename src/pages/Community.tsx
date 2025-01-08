import { motion } from "framer-motion";
import { MessageSquare, Users, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [flightConnections, setFlightConnections] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch forum posts
      const { data: posts, error: postsError } = await supabase
        .from('forum_posts')
        .select(`
          *,
          author:user_id(
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch flight connections
      const { data: connections, error: connectionsError } = await supabase
        .from('flight_connections')
        .select(`
          *,
          user:user_id(
            username
          )
        `)
        .order('departure_date', { ascending: true });

      if (connectionsError) throw connectionsError;

      setForumPosts(posts || []);
      setFlightConnections(connections || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (userId: string) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        navigate('/auth');
        return;
      }

      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: userId,
          content: "Hi! I'd like to connect with you about the flight.",
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Connection request sent!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeDifference = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return formatDate(timestamp);
  };

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

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <TabsContent value="forum">
                <div className="space-y-4">
                  {forumPosts
                    .filter(post => 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <span className="text-sm text-muted-foreground">
                              {getTimeDifference(post.created_at)}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{post.content}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-primary">
                              @{post.author?.username || 'Anonymous'}
                            </span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="connections">
                <div className="space-y-4">
                  {flightConnections
                    .filter(connection => 
                      connection.flight_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      connection.destination.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((connection) => (
                      <motion.div
                        key={connection.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">Flight {connection.flight_number}</h3>
                              <p className="text-sm text-muted-foreground">{connection.destination}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(connection.departure_date)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-primary">
                              @{connection.user?.username || 'Anonymous'}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConnect(connection.user_id)}
                            >
                              Connect
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Community;

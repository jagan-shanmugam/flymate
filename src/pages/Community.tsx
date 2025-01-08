import { motion } from "framer-motion";
import { MessageSquare, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/community/SearchBar";
import { ForumPostCard } from "@/components/community/ForumPostCard";
import { FlightConnectionCard } from "@/components/community/FlightConnectionCard";

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
      const { data: posts, error: postsError } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles!user_id(
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const { data: connections, error: connectionsError } = await supabase
        .from('flight_connections')
        .select(`
          *,
          profiles!user_id(
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
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
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
                      <ForumPostCard
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.profiles?.username}
                        createdAt={post.created_at}
                        getTimeDifference={getTimeDifference}
                      />
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
                      <FlightConnectionCard
                        key={connection.id}
                        flightNumber={connection.flight_number}
                        destination={connection.destination}
                        departureDate={connection.departure_date}
                        username={connection.profiles?.username}
                        userId={connection.user_id}
                        formatDate={formatDate}
                        onConnect={handleConnect}
                      />
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
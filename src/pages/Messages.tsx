import { motion } from "framer-motion";
import { MessageSquare, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  content: string;
  created_at: string;
  read: boolean | null;
  sender: {
    username: string | null;
  } | null;
}

const Messages = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          read,
          sender:profiles!sender_id(username)
        `)
        .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
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

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          setMessages(prevMessages => [payload.new as Message, ...prevMessages]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTimeDifference = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime.toLocaleDateString();
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

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {messages
              .filter(message =>
                message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                message.sender?.username?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  onClick={() => !message.read && markAsRead(message.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">
                          {message.sender?.username || 'Anonymous'}
                        </h3>
                        <p className="text-sm text-gray-600">{message.content}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {getTimeDifference(message.created_at)}
                    </div>
                  </div>
                  {!message.read && (
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        New message
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
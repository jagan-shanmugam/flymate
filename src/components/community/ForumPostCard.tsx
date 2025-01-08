import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ForumPostCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  getTimeDifference: (timestamp: string) => string;
}

export const ForumPostCard = ({ 
  title, 
  content, 
  author, 
  createdAt,
  getTimeDifference 
}: ForumPostCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-sm text-muted-foreground">
            {getTimeDifference(createdAt)}
          </span>
        </div>
        <p className="text-muted-foreground mb-3">{content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary">
            @{author || 'Anonymous'}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
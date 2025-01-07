import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const Checklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: "Pack essential travel documents", completed: false },
    { id: 2, text: "Check airline baggage policy", completed: false },
    { id: 3, text: "Prepare carry-on items", completed: false },
    { id: 4, text: "Online check-in 24h before flight", completed: false },
    { id: 5, text: "Arrange transportation to airport", completed: false },
    { id: 6, text: "Pack chargers and adapters", completed: false },
  ]);

  const toggleItem = (id: number) => {
    setChecklist(prevList => {
      const newList = prevList.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      
      const completedItem = newList.find(item => item.id === id);
      if (completedItem?.completed) {
        toast({
          title: "Task completed!",
          description: `You've completed: ${completedItem.text}`,
        });
      }
      
      return newList;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-[#9b87f5] text-white p-6 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Pre-flight Checklist</h1>
          <p className="text-white/80">Stay organized for your journey</p>
        </motion.div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-8">
        <div className="space-y-4">
          {checklist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-colors ${
                  item.completed ? "bg-secondary/50" : "bg-white"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="p-4 flex items-center gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      item.completed ? "bg-[#9b87f5] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Check size={20} />
                  </div>
                  <span className={item.completed ? "line-through text-gray-500" : ""}>
                    {item.text}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Checklist;
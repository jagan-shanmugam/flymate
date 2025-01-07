import { motion } from "framer-motion";
import { MapPin, Clock, Passport, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const guideItems = [
  {
    icon: Clock,
    title: "Arrival Time",
    description: "Arrive at least 2-3 hours before international flights, 1-2 hours for domestic",
  },
  {
    icon: Passport,
    title: "Check-in Process",
    description: "Head to your airline's check-in counter with your ID and booking confirmation",
  },
  {
    icon: Shield,
    title: "Security Check",
    description: "Remove electronics and liquids, prepare your boarding pass and ID",
  },
  {
    icon: MapPin,
    title: "Finding Your Gate",
    description: "Check the airport screens for your gate number and allow time to reach it",
  },
];

const Guide = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-[#9b87f5] text-white p-6 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Airport Guide</h1>
          <p className="text-white/80">Navigate the airport with confidence</p>
        </motion.div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-8">
        <div className="space-y-4">
          {guideItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-[#FEF7CD]">
                      <Icon className="w-6 h-6 text-[#9b87f5]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Guide;
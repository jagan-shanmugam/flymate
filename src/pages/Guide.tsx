import { motion } from "framer-motion";
import { MapPin, Plane, Info, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Guide = () => {
  const sections = [
    {
      id: 1,
      title: "Check-in Process",
      icon: MapPin,
      description: "Find your airline's check-in counter and get your boarding pass",
    },
    {
      id: 2,
      title: "Security Screening",
      icon: Info,
      description: "Learn what to expect at security and how to prepare",
    },
    {
      id: 3,
      title: "Finding Your Gate",
      icon: Plane,
      description: "Navigate to your departure gate with confidence",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-white p-6 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Airport Guide</h1>
          <p className="text-primary-100">Navigate the airport with confidence</p>
        </motion.div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-8">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary rounded-full p-3">
                      <section.icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                      <p className="text-gray-600 text-sm">{section.description}</p>
                    </div>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Guide;
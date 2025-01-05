import { Plane, Clock, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Pre-flight Checklist",
      description: "Stay organized with our interactive checklist",
    },
    {
      icon: Shield,
      title: "Security Guide",
      description: "Learn about security procedures",
    },
    {
      icon: Users,
      title: "Travel Community",
      description: "Connect with experienced travelers",
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
          <h1 className="text-3xl font-bold mb-2">Welcome Aboard</h1>
          <p className="text-primary-100">Your personal guide to stress-free flying</p>
        </motion.div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-8">
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Plane className="text-primary mr-3" size={24} />
              <h2 className="text-xl font-semibold">Next Steps</h2>
            </div>
            <p className="text-gray-600">
              Complete these steps to prepare for your first flight
            </p>
          </motion.div>
        </section>

        <section className="grid gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary transition-colors duration-200"
            >
              <div className="flex items-center mb-3">
                <feature.icon className="text-primary mr-3" size={24} />
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
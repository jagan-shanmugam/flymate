import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FlightConnectionCardProps {
  flightNumber: string;
  destination: string;
  departureDate: string;
  username: string;
  userId: string;
  formatDate: (date: string) => string;
  onConnect: (userId: string) => void;
}

export const FlightConnectionCard = ({
  flightNumber,
  destination,
  departureDate,
  username,
  userId,
  formatDate,
  onConnect
}: FlightConnectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">Flight {flightNumber}</h3>
            <p className="text-sm text-muted-foreground">{destination}</p>
          </div>
          <span className="text-sm text-muted-foreground">
            {formatDate(departureDate)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-primary">
            @{username || 'Anonymous'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConnect(userId)}
          >
            Connect
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
import { Home, Compass, CheckSquare, Users, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CheckSquare, label: "Checklist", path: "/checklist" },
    { icon: Compass, label: "Airport Guide", path: "/guide" },
    { icon: Users, label: "Community", path: "/community" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              isActive(path) ? "text-primary" : "text-gray-500 hover:text-primary"
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
import React from "react";
import { Bell, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Dashboard" }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
      <h1 className="text-xl font-bold text-white">{title}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search..."
            className="w-64 bg-gray-800 border-gray-700 pl-10 text-white"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-gray-700">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=TechChemist" />
            <AvatarFallback className="bg-blue-500 text-white">
              {user?.name?.charAt(0) || "TC"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              {user?.name || "Tech Chemist"}
            </p>
            <p className="text-xs text-gray-400">
              {user?.role || "Network Admin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

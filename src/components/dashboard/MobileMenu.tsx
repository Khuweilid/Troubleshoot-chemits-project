import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "../layout/Sidebar";

interface MobileMenuProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const MobileMenu = ({ activeItem, onItemClick }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-gray-900 border-gray-800">
        <Sidebar activeItem={activeItem} onItemClick={onItemClick} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

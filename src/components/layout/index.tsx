import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Layout = ({
  children,
  activeItem = "dashboard",
  onItemClick = () => {},
}: LayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-gray-950">
      <Sidebar activeItem={activeItem} onItemClick={onItemClick} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;

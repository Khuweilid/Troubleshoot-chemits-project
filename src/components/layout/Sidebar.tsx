import React, { useState } from "react";
import {
  Home,
  Network,
  Wrench,
  Users,
  BookOpen,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick = () => {},
  collapsed = false,
}: SidebarItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200",
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span className="font-medium">{label}</span>}
    </div>
  );
};

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar = ({
  activeItem = "dashboard",
  onItemClick = () => {},
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeMenu, setActiveMenu] = useState<string>(activeItem);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // In a real app, you would apply the theme to the document here
    // document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "troubleshoot", label: "Troubleshoot Guide", icon: Wrench },
    { id: "diagnostic", label: "Diagnostic Tools", icon: Network },
    { id: "community", label: "Community Forum", icon: Users },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  ];

  return (
    <div
      className={cn(
        "h-full bg-gray-900 text-white p-4 flex flex-col border-r border-gray-800 transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Network className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Troubleshoot Chemist</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeMenu === item.id}
            onClick={() => {
              setActiveMenu(item.id);
              onItemClick(item.id);
            }}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between px-4 mb-4">
          {!collapsed && <span className="text-sm text-gray-400">Theme</span>}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
        <SidebarItem
          icon={LogOut}
          label="Logout"
          collapsed={collapsed}
          onClick={() => {
            setActiveMenu("logout");
            onItemClick("logout");
          }}
        />

        {!collapsed && (
          <div className="px-4 py-4 mt-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium">TC</span>
              </div>
              <div>
                <p className="text-sm font-medium">Tech Chemist</p>
                <p className="text-xs text-gray-400">Network Admin</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              <p>License: Professional</p>
              <p>Version: 1.2.0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import DashboardContent from "./dashboard/DashboardContent";
import Header from "./dashboard/Header";
import { useAuth } from "./auth/AuthContext";

const Home: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { logout } = useAuth();

  const handleSidebarItemClick = (item: string) => {
    // Handle logout action
    if (item === "logout") {
      logout();
      return;
    }

    setActiveItem(item);

    // Map sidebar items to corresponding tabs in DashboardContent
    switch (item) {
      case "dashboard":
        setActiveTab("overview");
        break;
      case "troubleshoot":
        setActiveTab("troubleshooting");
        break;
      case "diagnostic":
        setActiveTab("tools");
        break;
      case "community":
        setActiveTab("community");
        break;
      case "knowledge":
        setActiveTab("knowledge");
        break;
      default:
        setActiveTab("overview");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Update sidebar selection based on tab
    switch (tab) {
      case "overview":
        setActiveItem("dashboard");
        break;
      case "troubleshooting":
        setActiveItem("troubleshoot");
        break;
      case "tools":
        setActiveItem("diagnostic");
        break;
      case "community":
        setActiveItem("community");
        break;
      case "knowledge":
        setActiveItem("knowledge");
        break;
      case "sandbox":
        setActiveItem("dashboard"); // Keep dashboard active for sandbox
        break;
      default:
        setActiveItem("dashboard");
    }
  };

  // Get the title for the header based on active item
  const getHeaderTitle = () => {
    switch (activeItem) {
      case "dashboard":
        return "Dashboard";
      case "troubleshoot":
        return "Troubleshoot Guide";
      case "diagnostic":
        return "Diagnostic Tools";
      case "community":
        return "Community Forum";
      case "knowledge":
        return "Knowledge Base";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-950">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarItemClick} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getHeaderTitle()} />
        <div className="flex-1 overflow-auto">
          <DashboardContent
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

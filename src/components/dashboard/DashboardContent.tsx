import React from "react";
import {
  InteractiveTroubleshootingCard,
  SandboxModeCard,
  KnowledgeBaseCard,
} from "./FeatureCard";
import TroubleshootingGuide from "./TroubleshootingGuide";
import SandboxEnvironment from "./SandboxEnvironment";
import DiagnosticTools from "../tools/DiagnosticTools";
import CommunityForum from "../community/CommunityForum";
import AIChatbot from "../community/AIChatbot";
import KnowledgeBase from "../knowledge/KnowledgeBase";
import QuickStats from "./QuickStats";
import NetworkDevices from "./NetworkDevices";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DashboardContentProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab = "overview",
  onTabChange = () => {},
}) => {
  const handleCardClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className="w-full h-full bg-gray-950 text-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
              <TabsTrigger value="tools">Diagnostic Tools</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Network Troubleshooting Dashboard
              </h2>
              <p className="text-gray-400 max-w-3xl">
                Welcome to Troubleshoot Chemist, your comprehensive dashboard
                for diagnosing and resolving network issues. Explore our
                interactive guides, simulated environments, and real-time
                diagnostic tools to solve your networking problems.
              </p>
            </div>

            <QuickStats />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InteractiveTroubleshootingCard
                onClick={() => handleCardClick("troubleshooting")}
              />
              <SandboxModeCard onClick={() => handleCardClick("sandbox")} />
              <KnowledgeBaseCard onClick={() => handleCardClick("knowledge")} />
            </div>

            <NetworkDevices />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Quick Diagnostic Tools
                </h2>
                <DiagnosticTools activeTab="ping" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
                <AIChatbot />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting">
            <TroubleshootingGuide />
          </TabsContent>

          <TabsContent value="sandbox">
            <SandboxEnvironment />
          </TabsContent>

          <TabsContent value="tools">
            <DiagnosticTools />
          </TabsContent>

          <TabsContent value="community">
            <CommunityForum />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardContent;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Server, BookOpen, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  className = "",
}: FeatureCardProps) => {
  return (
    <Card
      className={`bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg w-fit">
              <Icon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4 flex-grow">{description}</p>
          <Button
            variant="ghost"
            className="justify-start p-0 hover:bg-transparent hover:text-blue-400 group"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const InteractiveTroubleshootingCard = ({
  onClick,
}: {
  onClick?: () => void;
}) => (
  <FeatureCard
    title="Interactive Troubleshooting"
    description="Step-by-step guides to diagnose and resolve common network issues with interactive decision trees."
    icon={Wrench}
    onClick={onClick}
  />
);

export const SandboxModeCard = ({ onClick }: { onClick?: () => void }) => (
  <FeatureCard
    title="Network Sandbox"
    description="Practice troubleshooting in simulated network environments with various scenarios and challenges."
    icon={Server}
    onClick={onClick}
  />
);

export const KnowledgeBaseCard = ({ onClick }: { onClick?: () => void }) => (
  <FeatureCard
    title="Knowledge Base"
    description="Access a comprehensive library of networking articles, guides, and best practices."
    icon={BookOpen}
    onClick={onClick}
  />
);

export default FeatureCard;

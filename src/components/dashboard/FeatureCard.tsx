import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Server, BookOpen } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  actionText: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  iconColor?: string;
  bgColor?: string;
}

const FeatureCard = ({
  title = "Feature Title",
  description = "This is a description of the feature. It explains what the feature does and how it can help users.",
  icon: Icon = Zap,
  actionText = "Get Started",
  onClick = () => {},
  variant = "default",
  iconColor = "text-primary",
  bgColor = "bg-card",
}: FeatureCardProps) => {
  return (
    <Card
      className={`w-[380px] h-[320px] overflow-hidden flex flex-col ${bgColor} border-muted/20 hover:border-primary/50 transition-all duration-300`}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${iconColor} bg-muted/20`}>
            <Icon size={24} />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content can be added here if needed */}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button
          variant={variant}
          onClick={onClick}
          className="w-full justify-between group"
        >
          <span>{actionText}</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Example usage with different icons for different features
export const InteractiveTroubleshootingCard = (
  props: Partial<FeatureCardProps>,
) => (
  <FeatureCard
    title="Interactive Troubleshooting"
    description="Step-by-step guided troubleshooting with decision tree logic to help resolve network issues quickly."
    icon={Zap}
    actionText="Start Troubleshooting"
    iconColor="text-yellow-500"
    {...props}
  />
);

export const SandboxModeCard = (props: Partial<FeatureCardProps>) => (
  <FeatureCard
    title="Sandbox Mode"
    description="Practice troubleshooting in a simulated network environment with various scenarios and challenges."
    icon={Server}
    actionText="Enter Sandbox"
    variant="secondary"
    iconColor="text-blue-500"
    {...props}
  />
);

export const KnowledgeBaseCard = (props: Partial<FeatureCardProps>) => (
  <FeatureCard
    title="Knowledge Base"
    description="Access a comprehensive database of articles, FAQs, and common networking solutions."
    icon={BookOpen}
    actionText="Browse Knowledge Base"
    variant="outline"
    iconColor="text-green-500"
    {...props}
  />
);

export default FeatureCard;

import React, { useState } from "react";
import {
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface TroubleshootingStep {
  id: string;
  title: string;
  description: string;
  options?: TroubleshootingOption[];
  solution?: string;
  type: "question" | "solution" | "error";
}

interface TroubleshootingOption {
  id: string;
  text: string;
  nextStepId: string;
}

interface TroubleshootingGuideProps {
  initialStepId?: string;
  steps?: TroubleshootingStep[];
}

const defaultSteps: TroubleshootingStep[] = [
  {
    id: "start",
    title: "What type of network issue are you experiencing?",
    description:
      "Select the option that best describes your current network problem.",
    type: "question",
    options: [
      {
        id: "opt1",
        text: "Cannot connect to the internet",
        nextStepId: "internet-issue",
      },
      {
        id: "opt2",
        text: "Slow connection speeds",
        nextStepId: "slow-connection",
      },
      {
        id: "opt3",
        text: "Intermittent connectivity",
        nextStepId: "intermittent",
      },
      { id: "opt4", text: "Wi-Fi signal problems", nextStepId: "wifi-signal" },
      {
        id: "opt5",
        text: "Device-specific connection issues",
        nextStepId: "device-specific",
      },
    ],
  },
  {
    id: "internet-issue",
    title: "Internet Connection Troubleshooting",
    description: "Let's check your basic connection status.",
    type: "question",
    options: [
      {
        id: "opt1",
        text: "My router/modem lights are off or flashing red",
        nextStepId: "router-power",
      },
      {
        id: "opt2",
        text: "My router/modem lights are normal",
        nextStepId: "router-restart",
      },
      { id: "opt3", text: "I'm not sure", nextStepId: "router-check" },
    ],
  },
  {
    id: "router-power",
    title: "Power Issue Detected",
    description: "Your router or modem may have a power issue.",
    type: "solution",
    solution:
      "Check that your router and modem are properly plugged in. Verify that the power outlet is working by plugging in another device. If the power is fine but the device still won't power on, the router/modem may be faulty and need replacement.",
  },
  {
    id: "router-restart",
    title: "Try Restarting Your Router",
    description: "A simple restart often resolves many connection issues.",
    type: "solution",
    solution:
      "1. Unplug your router and modem from power\n2. Wait 30 seconds\n3. Plug in your modem and wait for it to fully boot (usually 1-2 minutes)\n4. Plug in your router and wait for it to fully boot (usually 1-2 minutes)\n5. Test your connection again",
  },
  {
    id: "slow-connection",
    title: "Slow Connection Troubleshooting",
    description: "Let's identify what might be causing your slow connection.",
    type: "question",
    options: [
      {
        id: "opt1",
        text: "It's slow on all devices",
        nextStepId: "all-devices-slow",
      },
      {
        id: "opt2",
        text: "It's only slow on one device",
        nextStepId: "one-device-slow",
      },
      {
        id: "opt3",
        text: "It's slow at certain times of day",
        nextStepId: "peak-hours",
      },
    ],
  },
  {
    id: "all-devices-slow",
    title: "Network-Wide Slow Connection",
    description: "The issue affects your entire network.",
    type: "solution",
    solution:
      "1. Run a speed test to verify your current speeds\n2. Restart your router and modem\n3. Check if you're experiencing network congestion during peak hours\n4. Contact your ISP to verify there are no outages or issues in your area\n5. Consider upgrading your internet plan if you consistently need more bandwidth",
  },
  {
    id: "intermittent",
    title: "Intermittent Connection Issues",
    description: "Let's troubleshoot your inconsistent connection.",
    type: "error",
    solution:
      "Intermittent connection issues can be difficult to diagnose. Common causes include:\n\n- Wireless interference from other devices\n- Router overheating\n- Outdated router firmware\n- ISP network problems\n- Physical connection problems\n\nTry updating your router firmware, checking for interference sources, and monitoring when the issues occur to identify patterns.",
  },
];

const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({
  initialStepId = "start",
  steps = defaultSteps,
}) => {
  const [currentStepId, setCurrentStepId] = useState<string>(initialStepId);
  const [history, setHistory] = useState<string[]>([]);

  const currentStep =
    steps.find((step) => step.id === currentStepId) || steps[0];

  const handleOptionSelect = (nextStepId: string) => {
    setHistory([...history, currentStepId]);
    setCurrentStepId(nextStepId);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousStepId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentStepId(previousStepId);
    }
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentStepId(initialStepId);
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "question":
        return (
          <div className="space-y-4">
            <p className="text-gray-300">{currentStep.description}</p>
            <div className="space-y-2">
              {currentStep.options?.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full justify-between text-left bg-gray-800 hover:bg-gray-700 border-gray-700"
                  onClick={() => handleOptionSelect(option.nextStepId)}
                >
                  <span>{option.text}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        );
      case "solution":
        return (
          <div className="space-y-4">
            <Alert className="bg-green-900/30 border-green-800">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">Solution Found</AlertTitle>
              <AlertDescription className="text-gray-300">
                Follow these steps to resolve your issue.
              </AlertDescription>
            </Alert>
            <p className="text-gray-300">{currentStep.description}</p>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-gray-300">
                {currentStep.solution}
              </pre>
            </div>
            <div className="pt-4">
              <Accordion type="single" collapsible className="border-gray-700">
                <AccordionItem value="faq-1" className="border-gray-700">
                  <AccordionTrigger className="text-gray-300">
                    Still having issues?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    If you're still experiencing problems after following these
                    steps, you may need more advanced troubleshooting. Consider
                    using our diagnostic tools or contacting community support.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="space-y-4">
            <Alert className="bg-amber-900/30 border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">
                Complex Issue Detected
              </AlertTitle>
              <AlertDescription className="text-gray-300">
                This issue may require advanced troubleshooting.
              </AlertDescription>
            </Alert>
            <p className="text-gray-300">{currentStep.description}</p>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap text-gray-300">
                {currentStep.solution}
              </pre>
            </div>
            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700"
              >
                Run Network Diagnostics
              </Button>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-300">Unknown step type</p>;
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 text-white p-6 rounded-xl">
      <Card className="bg-gray-900 border-gray-700 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-xl text-white">
                Network Troubleshooting Guide
              </CardTitle>
            </div>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          <CardDescription className="text-gray-400">
            Follow the interactive guide to diagnose and fix your network issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-white mb-2">
              {currentStep.title}
            </h2>
            {renderStepContent()}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleRestart}
            className="text-gray-400 hover:text-white"
          >
            Start Over
          </Button>
          <div className="text-sm text-gray-500">
            Step {history.length + 1} of troubleshooting process
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TroubleshootingGuide;

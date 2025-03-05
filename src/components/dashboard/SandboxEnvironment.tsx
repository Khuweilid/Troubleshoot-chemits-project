import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Server,
  Wifi,
  Globe,
  Shield,
  Database,
  Router,
  Laptop,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Terminal,
  Play,
  Pause,
  RotateCw,
} from "lucide-react";

interface NetworkScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "connectivity" | "security" | "performance";
  duration: number; // in minutes
  objectives: string[];
}

interface SandboxEnvironmentProps {
  scenarios?: NetworkScenario[];
  selectedScenario?: string | null;
}

const defaultScenarios: NetworkScenario[] = [
  {
    id: "1",
    title: "DNS Resolution Failure",
    description:
      "Diagnose and fix DNS resolution issues in a corporate network environment.",
    difficulty: "beginner",
    category: "connectivity",
    duration: 15,
    objectives: [
      "Identify the DNS server configuration",
      "Test DNS resolution using command-line tools",
      "Implement the correct DNS settings",
      "Verify connectivity is restored",
    ],
  },
  {
    id: "2",
    title: "Secure Wireless Network Setup",
    description:
      "Configure a secure wireless network with proper encryption and access controls.",
    difficulty: "intermediate",
    category: "security",
    duration: 25,
    objectives: [
      "Set up WPA3 encryption",
      "Configure MAC address filtering",
      "Implement network segmentation",
      "Test security with penetration tools",
    ],
  },
  {
    id: "3",
    title: "Network Bottleneck Analysis",
    description:
      "Identify and resolve performance bottlenecks in a congested network.",
    difficulty: "advanced",
    category: "performance",
    duration: 30,
    objectives: [
      "Run network performance tests",
      "Analyze bandwidth utilization",
      "Identify congestion points",
      "Implement QoS policies",
      "Verify performance improvements",
    ],
  },
  {
    id: "4",
    title: "VPN Connectivity Troubleshooting",
    description:
      "Diagnose and resolve VPN connection issues between remote sites.",
    difficulty: "intermediate",
    category: "connectivity",
    duration: 20,
    objectives: [
      "Verify VPN tunnel configuration",
      "Check firewall rules",
      "Test encryption settings",
      "Establish stable connection",
    ],
  },
  {
    id: "5",
    title: "Firewall Rule Optimization",
    description:
      "Optimize firewall rules for security and performance in an enterprise network.",
    difficulty: "advanced",
    category: "security",
    duration: 35,
    objectives: [
      "Audit existing firewall rules",
      "Identify redundant or conflicting rules",
      "Implement rule optimization",
      "Test security posture",
      "Document changes",
    ],
  },
];

const ScenarioSelector = ({
  scenarios,
  onSelectScenario,
}: {
  scenarios: NetworkScenario[];
  onSelectScenario: (id: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenarios.map((scenario) => (
        <Card
          key={scenario.id}
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => onSelectScenario(scenario.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{scenario.title}</CardTitle>
              <Badge
                variant={
                  scenario.difficulty === "beginner"
                    ? "default"
                    : scenario.difficulty === "intermediate"
                      ? "secondary"
                      : "destructive"
                }
              >
                {scenario.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {scenario.description}
            </p>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="flex items-center gap-1">
                {scenario.category === "connectivity" ? (
                  <Globe className="h-3 w-3" />
                ) : scenario.category === "security" ? (
                  <Shield className="h-3 w-3" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
                {scenario.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {scenario.duration} min
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const NetworkTopology = () => {
  return (
    <div className="bg-gray-950 p-6 rounded-lg h-[400px] relative">
      <h3 className="text-lg font-medium mb-4">Network Topology</h3>
      <div className="flex justify-center items-center h-[300px]">
        {/* Simple network topology visualization */}
        <div className="relative w-full max-w-2xl">
          {/* Internet */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Globe className="h-12 w-12 text-blue-400" />
            <span className="mt-2 text-sm">Internet</span>
          </div>

          {/* Router */}
          <div className="absolute top-[100px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Router className="h-10 w-10 text-purple-400" />
            <span className="mt-2 text-sm">Router</span>
            {/* Connection line */}
            <div className="absolute h-[60px] w-0.5 bg-gray-600 -top-[60px]"></div>
          </div>

          {/* Firewall */}
          <div className="absolute top-[170px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Shield className="h-10 w-10 text-red-400" />
            <span className="mt-2 text-sm">Firewall</span>
            {/* Connection line */}
            <div className="absolute h-[40px] w-0.5 bg-gray-600 -top-[40px]"></div>
          </div>

          {/* Switch */}
          <div className="absolute top-[240px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Server className="h-10 w-10 text-green-400" />
            <span className="mt-2 text-sm">Switch</span>
            {/* Connection line */}
            <div className="absolute h-[40px] w-0.5 bg-gray-600 -top-[40px]"></div>
          </div>

          {/* Devices */}
          <div className="absolute top-[240px] left-[20%] flex flex-col items-center">
            <Laptop className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-xs">Workstation 1</span>
            {/* Connection line */}
            <div className="absolute w-[120px] h-0.5 bg-gray-600 top-4 -right-[120px]"></div>
          </div>

          <div className="absolute top-[240px] right-[20%] flex flex-col items-center">
            <Database className="h-8 w-8 text-yellow-400" />
            <span className="mt-2 text-xs">Database</span>
            {/* Connection line */}
            <div className="absolute w-[120px] h-0.5 bg-gray-600 top-4 -left-[120px]"></div>
          </div>

          <div className="absolute bottom-0 left-1/3 flex flex-col items-center">
            <Wifi className="h-8 w-8 text-blue-400" />
            <span className="mt-2 text-xs">Access Point</span>
            {/* Connection line */}
            <div className="absolute h-[40px] w-0.5 bg-gray-600 -top-[40px] left-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimulationControls = ({
  onStart,
  onPause,
  onReset,
  isRunning,
}: {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isRunning: boolean;
}) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      {!isRunning ? (
        <Button onClick={onStart} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Start Simulation
        </Button>
      ) : (
        <Button
          onClick={onPause}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Pause className="h-4 w-4" />
          Pause Simulation
        </Button>
      )}
      <Button
        onClick={onReset}
        variant="ghost"
        className="flex items-center gap-2"
      >
        <RotateCw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};

const TerminalOutput = ({ output = [] }: { output?: string[] }) => {
  return (
    <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-[200px] overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="h-4 w-4" />
        <span>Terminal</span>
      </div>
      {output.length > 0 ? (
        output.map((line, index) => (
          <div key={index} className="py-0.5">
            {index === output.length - 1 ? (
              <span className="flex items-center">
                <span className="text-blue-400 mr-2">$</span> {line}
                <span className="ml-1 h-4 w-2 bg-green-400 animate-pulse"></span>
              </span>
            ) : (
              <span>
                <span className="text-blue-400 mr-2">$</span> {line}
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">$</span>
          <span className="h-4 w-2 bg-green-400 animate-pulse"></span>
        </div>
      )}
    </div>
  );
};

const ObjectivesList = ({
  objectives,
  completedObjectives,
}: {
  objectives: string[];
  completedObjectives: number[];
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Objectives</h3>
      <ul className="space-y-3">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2">
            {completedObjectives.includes(index) ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <div className="h-5 w-5 rounded-full border border-gray-600 mt-0.5"></div>
            )}
            <span
              className={
                completedObjectives.includes(index) ? "text-green-500" : ""
              }
            >
              {objective}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ScenarioSimulation = ({
  scenario,
  onBack,
}: {
  scenario: NetworkScenario;
  onBack: () => void;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("topology");

  const handleStart = () => {
    setIsRunning(true);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });

      // Simulate completing objectives
      if (progress === 20 && !completedObjectives.includes(0)) {
        setCompletedObjectives((prev) => [...prev, 0]);
        setTerminalOutput((prev) => [...prev, "Checking DNS configuration..."]);
      } else if (progress === 40 && !completedObjectives.includes(1)) {
        setCompletedObjectives((prev) => [...prev, 1]);
        setTerminalOutput((prev) => [
          ...prev,
          "Running nslookup to test DNS resolution...",
        ]);
      } else if (progress === 60 && !completedObjectives.includes(2)) {
        setCompletedObjectives((prev) => [...prev, 2]);
        setTerminalOutput((prev) => [
          ...prev,
          "Updating DNS server settings...",
        ]);
      } else if (progress === 80 && !completedObjectives.includes(3)) {
        setCompletedObjectives((prev) => [...prev, 3]);
        setTerminalOutput((prev) => [
          ...prev,
          "Testing connectivity with ping...",
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
    setCompletedObjectives([]);
    setTerminalOutput([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{scenario.title}</h2>
          <p className="text-muted-foreground">{scenario.description}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Scenarios
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant={
            scenario.difficulty === "beginner"
              ? "default"
              : scenario.difficulty === "intermediate"
                ? "secondary"
                : "destructive"
          }
        >
          {scenario.difficulty}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {scenario.category === "connectivity" ? (
            <Globe className="h-3 w-3" />
          ) : scenario.category === "security" ? (
            <Shield className="h-3 w-3" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          {scenario.category}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {scenario.duration} minutes
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Progress:</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {completedObjectives.length}/{scenario.objectives.length}{" "}
              objectives completed
            </span>
            {progress === 100 && (
              <Badge variant="default" className="bg-green-600">
                Completed
              </Badge>
            )}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topology">Network Topology</TabsTrigger>
          <TabsTrigger value="terminal">Terminal & Objectives</TabsTrigger>
        </TabsList>
        <TabsContent value="topology" className="mt-4">
          <NetworkTopology />
        </TabsContent>
        <TabsContent value="terminal" className="mt-4 space-y-4">
          <TerminalOutput output={terminalOutput} />
          <ObjectivesList
            objectives={scenario.objectives}
            completedObjectives={completedObjectives}
          />
        </TabsContent>
      </Tabs>

      <SimulationControls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        isRunning={isRunning}
      />
    </div>
  );
};

const SandboxEnvironment = ({
  scenarios = defaultScenarios,
  selectedScenario = null,
}: SandboxEnvironmentProps) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(
    selectedScenario,
  );
  const [filter, setFilter] = useState<string>("all");

  const filteredScenarios = scenarios.filter((scenario) => {
    if (filter === "all") return true;
    if (
      filter === "beginner" ||
      filter === "intermediate" ||
      filter === "advanced"
    ) {
      return scenario.difficulty === filter;
    }
    if (
      filter === "connectivity" ||
      filter === "security" ||
      filter === "performance"
    ) {
      return scenario.category === filter;
    }
    return true;
  });

  const handleSelectScenario = (id: string) => {
    setActiveScenario(id);
  };

  const handleBackToScenarios = () => {
    setActiveScenario(null);
  };

  const selectedScenarioData = scenarios.find((s) => s.id === activeScenario);

  return (
    <div className="w-full h-full bg-gray-950 text-white p-6 rounded-lg overflow-auto">
      <div className="max-w-6xl mx-auto">
        {!activeScenario ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  Network Sandbox Environment
                </h1>
                <p className="text-muted-foreground">
                  Practice troubleshooting in simulated network environments
                </p>
              </div>
              <div className="w-64">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter scenarios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scenarios</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="connectivity">Connectivity</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ScenarioSelector
              scenarios={filteredScenarios}
              onSelectScenario={handleSelectScenario}
            />
          </>
        ) : (
          selectedScenarioData && (
            <ScenarioSimulation
              scenario={selectedScenarioData}
              onBack={handleBackToScenarios}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SandboxEnvironment;

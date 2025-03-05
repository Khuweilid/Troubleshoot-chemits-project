import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Wifi,
  Globe,
  BarChart2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface DiagnosticToolsProps {
  activeTab?: string;
  pingResults?: PingResult[];
  tracerouteResults?: TracerouteResult[];
  speedTestResults?: SpeedTestResult;
}

interface PingResult {
  host: string;
  status: "success" | "failed";
  time: number;
  ttl?: number;
}

interface TracerouteResult {
  hop: number;
  host: string;
  ip: string;
  time: number;
}

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  progress: number;
  status: "idle" | "running" | "complete";
}

const DiagnosticTools: React.FC<DiagnosticToolsProps> = ({
  activeTab = "ping",
  pingResults = [
    { host: "google.com", status: "success", time: 42, ttl: 56 },
    { host: "cloudflare.com", status: "success", time: 38, ttl: 57 },
    { host: "unreachable-host.com", status: "failed", time: 0 },
  ],
  tracerouteResults = [
    { hop: 1, host: "router.local", ip: "192.168.1.1", time: 2 },
    { hop: 2, host: "isp-gateway", ip: "10.0.0.1", time: 15 },
    { hop: 3, host: "backbone-router-1", ip: "172.16.0.1", time: 28 },
    { hop: 4, host: "destination-server", ip: "8.8.8.8", time: 42 },
  ],
  speedTestResults = {
    download: 95.6,
    upload: 35.2,
    ping: 24,
    jitter: 3.5,
    progress: 100,
    status: "complete" as const,
  },
}) => {
  const [hostInput, setHostInput] = useState<string>("google.com");
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [localSpeedTestResults, setLocalSpeedTestResults] =
    useState<SpeedTestResult>(speedTestResults);

  const handleRunPing = () => {
    if (!hostInput.trim()) return;
    setIsRunning(true);

    // Simulate ping test running
    setTimeout(() => {
      setIsRunning(false);
      // In a real app, this would update with actual ping results
    }, 2000);
  };

  const handleRunTraceroute = () => {
    if (!hostInput.trim()) return;
    setIsRunning(true);

    // Simulate traceroute running
    setTimeout(() => {
      setIsRunning(false);
      // In a real app, this would update with actual traceroute results
    }, 3000);
  };

  const handleRunSpeedTest = () => {
    setIsRunning(true);
    setLocalSpeedTestResults({
      ...localSpeedTestResults,
      progress: 0,
      status: "running",
    });

    // Simulate speed test progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLocalSpeedTestResults((prev) => ({
        ...prev,
        progress: progress,
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setLocalSpeedTestResults((prev) => ({
          ...prev,
          status: "complete",
        }));
      }
    }, 300);
  };

  return (
    <div className="w-full h-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Network Diagnostic Tools</h2>
        <p className="text-muted-foreground">
          Run various network diagnostics to troubleshoot connectivity issues
        </p>
      </div>

      <Tabs
        defaultValue={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="ping" disabled={isRunning}>
            <Activity className="mr-2 h-4 w-4" />
            Ping Test
          </TabsTrigger>
          <TabsTrigger value="traceroute" disabled={isRunning}>
            <Globe className="mr-2 h-4 w-4" />
            Traceroute
          </TabsTrigger>
          <TabsTrigger value="speedtest" disabled={isRunning}>
            <Wifi className="mr-2 h-4 w-4" />
            Speed Test
          </TabsTrigger>
        </TabsList>

        {/* Ping Test Content */}
        <TabsContent value="ping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ping Test</CardTitle>
              <CardDescription>
                Test connectivity to a specific host by sending ICMP echo
                requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter hostname or IP address"
                  value={hostInput}
                  onChange={(e) => setHostInput(e.target.value)}
                  disabled={isRunning}
                  className="flex-1"
                />
                <Button onClick={handleRunPing} disabled={isRunning}>
                  {isRunning ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-4 w-4" />
                      Run Ping
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="font-medium mb-2">Results</h3>
                {pingResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${result.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <span>{result.host}</span>
                    </div>
                    <div className="text-sm">
                      {result.status === "success" ? (
                        <span>
                          {result.time}ms (TTL={result.ttl})
                        </span>
                      ) : (
                        <span className="text-red-500">Request timed out</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traceroute Content */}
        <TabsContent value="traceroute" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traceroute</CardTitle>
              <CardDescription>
                Trace the route packets take to reach a destination host
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter hostname or IP address"
                  value={hostInput}
                  onChange={(e) => setHostInput(e.target.value)}
                  disabled={isRunning}
                  className="flex-1"
                />
                <Button onClick={handleRunTraceroute} disabled={isRunning}>
                  {isRunning ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Run Traceroute
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="font-medium mb-2">Route Trace</h3>
                <div className="space-y-2">
                  {tracerouteResults.map((hop, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                          {hop.hop}
                        </div>
                        {index < tracerouteResults.length - 1 && (
                          <div className="w-0.5 h-8 bg-muted-foreground/30"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{hop.host}</div>
                        <div className="text-sm text-muted-foreground">
                          IP: {hop.ip} | Response time: {hop.time}ms
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Speed Test Content */}
        <TabsContent value="speedtest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Internet Speed Test</CardTitle>
              <CardDescription>
                Measure your connection's download and upload speeds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleRunSpeedTest}
                disabled={
                  isRunning || localSpeedTestResults.status === "running"
                }
                className="mb-6 w-full"
              >
                {localSpeedTestResults.status === "running" ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Running Speed Test...
                  </>
                ) : (
                  <>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Start Speed Test
                  </>
                )}
              </Button>

              {localSpeedTestResults.status === "running" && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Testing in progress</span>
                    <span>{localSpeedTestResults.progress}%</span>
                  </div>
                  <Progress
                    value={localSpeedTestResults.progress}
                    className="h-2"
                  />
                </div>
              )}

              {localSpeedTestResults.status === "complete" && (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <ArrowRight className="h-6 w-6 mx-auto mb-2 rotate-90 text-blue-500" />
                        <div className="text-2xl font-bold">
                          {localSpeedTestResults.download} Mbps
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Download
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <ArrowRight className="h-6 w-6 mx-auto mb-2 -rotate-90 text-green-500" />
                        <div className="text-2xl font-bold">
                          {localSpeedTestResults.upload} Mbps
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Upload
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                        <div className="text-2xl font-bold">
                          {localSpeedTestResults.ping} ms
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ping
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Activity className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                        <div className="text-2xl font-bold">
                          {localSpeedTestResults.jitter} ms
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Jitter
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagnosticTools;

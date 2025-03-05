import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Router, Laptop, Server, Wifi } from "lucide-react";
import { dbService, NetworkDevice } from "@/lib/db-service";

const NetworkDevices = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const networkDevices = await dbService.getNetworkDevices();
      setDevices(networkDevices);
    } catch (error) {
      console.error("Error fetching network devices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.ipAddress.includes(searchQuery) ||
      device.macAddress.includes(searchQuery),
  );

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "router":
        return <Router className="h-5 w-5" />;
      case "switch":
        return <Server className="h-5 w-5" />;
      case "access point":
        return <Wifi className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Network Devices</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px] bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchDevices}
              className="bg-gray-800 border-gray-700"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : filteredDevices.length > 0 ? (
          <div className="grid gap-4">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-700">
                    {getDeviceIcon(device.deviceType)}
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-sm text-gray-400">{device.ipAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400 hidden md:block">
                    {device.macAddress}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor(device.status)}`}
                    ></div>
                    <span className="text-sm capitalize">{device.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No devices found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkDevices;

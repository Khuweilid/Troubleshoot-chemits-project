import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, Server, AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  iconColor?: string;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = "neutral",
  iconColor = "text-blue-500",
}: StatCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            {change && (
              <p
                className={`text-xs mt-1 ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400"}`}
              >
                {change}
              </p>
            )}
          </div>
          <div className={`p-2 rounded-lg bg-gray-800 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Network Uptime"
        value="99.8%"
        change="0.2% from last week"
        icon={Activity}
        trend="up"
        iconColor="text-green-500"
      />
      <StatCard
        title="Avg. Response Time"
        value="42ms"
        change="5ms improvement"
        icon={Zap}
        trend="up"
        iconColor="text-yellow-500"
      />
      <StatCard
        title="Active Devices"
        value="128"
        change="+12 since yesterday"
        icon={Server}
        trend="up"
        iconColor="text-blue-500"
      />
      <StatCard
        title="Critical Alerts"
        value="3"
        change="-2 from yesterday"
        icon={AlertTriangle}
        trend="down"
        iconColor="text-red-500"
      />
    </div>
  );
};

export default QuickStats;

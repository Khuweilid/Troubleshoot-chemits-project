// Import mock data instead of using mysql2 in browser environment
// import { pool } from "./db-connection";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface NetworkDevice {
  id: number;
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: Date;
}

export interface NetworkIssue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy: number;
  assignedTo: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

class DatabaseService {
  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    console.log(`Getting user with email: ${email}`);
    // Using mock data for browser environment
    if (email === "admin@example.com") {
      return {
        id: 1,
        name: "Tech Chemist",
        email: "admin@example.com",
        role: "admin",
      };
    }
    return null;
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    console.log(`Validating credentials for: ${email}`);
    // Using mock data for browser environment
    if (email === "admin@example.com" && password === "password") {
      return {
        id: 1,
        name: "Tech Chemist",
        email: "admin@example.com",
        role: "admin",
      };
    }
    return null;
  }

  // Network devices methods
  async getNetworkDevices(): Promise<NetworkDevice[]> {
    // Using mock data for browser environment
    return [
      {
        id: 1,
        name: "Main Router",
        ipAddress: "192.168.1.1",
        macAddress: "00:11:22:33:44:55",
        deviceType: "router",
        status: "active",
        lastSeen: new Date(),
      },
      {
        id: 2,
        name: "Office Switch",
        ipAddress: "192.168.1.2",
        macAddress: "00:11:22:33:44:66",
        deviceType: "switch",
        status: "active",
        lastSeen: new Date(),
      },
    ];
  }

  // Knowledge base methods
  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    // Using mock data for browser environment
    return [
      {
        id: 1,
        title: "Understanding Network Latency Issues",
        content: "Content about network latency...",
        category: "Network Performance",
        tags: ["latency", "performance", "troubleshooting"],
        authorId: 1,
        createdAt: new Date("2023-10-15"),
        updatedAt: new Date("2023-10-15"),
      },
      {
        id: 2,
        title: "Common DNS Configuration Errors",
        content: "Content about DNS configuration...",
        category: "DNS",
        tags: ["dns", "configuration", "errors"],
        authorId: 1,
        createdAt: new Date("2023-09-22"),
        updatedAt: new Date("2023-09-22"),
      },
    ];
  }
}

export const dbService = new DatabaseService();

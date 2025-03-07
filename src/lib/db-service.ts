// Import pool conditionally to avoid browser errors
let pool;
try {
  if (typeof window === "undefined") {
    // Only import in Node.js environment
    const connection = require("./db-connection");
    pool = connection.pool;
  }
} catch (error) {
  console.log("Running in browser mode, database connection not available");
}

import { hashPassword, verifyPassword } from "./db-utils";

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
  // User registration
  async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      // Check if user already exists
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Hash the password
      const hashedPassword = hashPassword(password);

      // Try to save to XAMPP database first
      try {
        // Try to use PHP API if available
        const response = await fetch("/troubleshoot-chemist/api/register.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password: hashedPassword,
            role: "user",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            return {
              id: data.userId,
              name,
              email,
              role: "user",
            };
          }
        }
      } catch (phpError) {
        console.log(
          "PHP API not available, falling back to Node.js or mock data",
        );
      }

      // Insert the new user using Node.js if available
      if (pool) {
        const [result] = await pool.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, "user"],
        );

        if (result && "insertId" in result) {
          // Return the newly created user (without password)
          return {
            id: result.insertId as number,
            name,
            email,
            role: "user",
          };
        }
      }
      // In browser mode, return mock data
      return {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        role: "user",
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
  // User methods
  async getUserByEmail(email: string): Promise<User | null> {
    console.log(`Getting user with email: ${email}`);
    try {
      if (pool) {
        const [rows] = await pool.query(
          "SELECT id, name, email, role FROM users WHERE email = ?",
          [email],
        );

        if (Array.isArray(rows) && rows.length > 0) {
          return rows[0] as User;
        }
      }
      // Fallback to mock data if database connection fails
      if (email === "khuwabdul@yahoo.com") {
        return {
          id: 1,
          name: "Tech Chemist",
          email: "khuwabdul@yahoo.com",
          role: "admin",
        };
      }
      return null;
    } catch (error) {
      console.error("Database error:", error);
      // Fallback to mock data if database connection fails
      if (email === "khuwabdul@yahoo.com") {
        return {
          id: 1,
          name: "Tech Chemist",
          email: "khuwabdul@yahoo.com",
          role: "admin",
        };
      }
      return null;
    }
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    console.log(`Validating credentials for: ${email}`);
    try {
      if (pool) {
        const [rows] = await pool.query(
          "SELECT id, name, email, role, password FROM users WHERE email = ?",
          [email],
        );

        if (Array.isArray(rows) && rows.length > 0) {
          const user = rows[0] as User & { password: string };

          // Check if password matches
          // For the default admin user with the hardcoded password
          if (email === "khuwabdul@yahoo.com" && password === "Khuw@210498") {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }

          // For other users, verify the hashed password
          if (verifyPassword(password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
      }
      // Fallback to mock data if database connection fails
      if (email === "admin@example.com" && password === "password") {
        return {
          id: 1,
          name: "Tech Chemist",
          email: "admin@example.com",
          role: "admin",
        };
      }
      return null;
    } catch (error) {
      console.error("Database error:", error);
      // Fallback to mock data if database connection fails
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

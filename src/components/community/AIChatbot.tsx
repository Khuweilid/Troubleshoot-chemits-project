import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChatbotProps {
  title?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
}

const AIChatbot = ({
  title = "Network Assistant",
  initialMessages = [
    {
      id: "1",
      content:
        "Hello! I'm your AI network troubleshooting assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  onSendMessage = () => {},
}: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    onSendMessage(inputValue);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    // Mock AI responses based on common networking questions
    if (query.toLowerCase().includes("wifi")) {
      return "To troubleshoot WiFi issues, try: 1) Restart your router, 2) Check if other devices can connect, 3) Move closer to the router, 4) Update router firmware.";
    } else if (query.toLowerCase().includes("ping")) {
      return 'Ping is a network utility that tests connectivity between your computer and another device or server. Try running "ping google.com" in your terminal to test internet connectivity.';
    } else if (query.toLowerCase().includes("slow")) {
      return "Slow network could be caused by: bandwidth limitations, network congestion, hardware issues, or interference. Try running a speed test to diagnose the problem.";
    } else {
      return "I understand you have a networking question. Could you provide more specific details about the issue you're experiencing?";
    }
  };

  return (
    <Card className="w-full h-full flex flex-col bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        message.sender === "user"
                          ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                          : "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
                      }
                      alt={message.sender === "user" ? "User" : "AI Assistant"}
                    />
                    <AvatarFallback>
                      {message.sender === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Type your network question here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChatbot;

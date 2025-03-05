import React from "react";
import {
  Search,
  MessageSquare,
  Plus,
  Filter,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ForumThread {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  replies: number;
  views: number;
  tags: string[];
  solved: boolean;
}

interface CommunityForumProps {
  threads?: ForumThread[];
}

const CommunityForum = ({ threads = defaultThreads }: CommunityForumProps) => {
  return (
    <div className="w-full h-full bg-gray-950 text-white p-6 rounded-lg overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Forum</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Thread
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search discussions..."
            className="pl-10 bg-gray-900 border-gray-800 text-white"
          />
        </div>
        <Button variant="outline" className="bg-gray-900 border-gray-800">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-gray-900 mb-6 w-full justify-start">
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </TabsContent>

        <TabsContent value="solved" className="space-y-4">
          {threads
            .filter((thread) => thread.solved)
            .map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          {threads
            .filter((thread) => thread.replies === 0)
            .map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
        </TabsContent>

        <TabsContent value="my-posts" className="space-y-4">
          {threads
            .filter((thread) => thread.author.name === "You")
            .map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ThreadCardProps {
  thread: ForumThread;
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={thread.author.avatar}
                alt={thread.author.name}
              />
              <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium">{thread.author.name}</span>
              <p className="text-xs text-gray-400">{thread.date}</p>
            </div>
          </div>
          {thread.solved && (
            <Badge variant="secondary" className="bg-green-900 text-green-300">
              Solved
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{thread.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mt-2">
          {thread.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{thread.replies} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{thread.views} views</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultThreads: ForumThread[] = [
  {
    id: "1",
    title: "How to troubleshoot DNS resolution issues in a corporate network?",
    author: {
      name: "NetworkPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NetworkPro",
    },
    date: "2 hours ago",
    replies: 12,
    views: 145,
    tags: ["DNS", "Corporate", "Troubleshooting"],
    solved: true,
  },
  {
    id: "2",
    title: "Best practices for diagnosing intermittent connectivity issues",
    author: {
      name: "TechGuru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechGuru",
    },
    date: "1 day ago",
    replies: 8,
    views: 97,
    tags: ["Connectivity", "Best Practices"],
    solved: false,
  },
  {
    id: "3",
    title: "Setting up VLANs for improved network segmentation",
    author: {
      name: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    },
    date: "3 days ago",
    replies: 5,
    views: 78,
    tags: ["VLAN", "Segmentation", "Security"],
    solved: false,
  },
  {
    id: "4",
    title: "Troubleshooting high latency in cloud-based applications",
    author: {
      name: "CloudExpert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CloudExpert",
    },
    date: "5 days ago",
    replies: 15,
    views: 210,
    tags: ["Cloud", "Latency", "Performance"],
    solved: true,
  },
  {
    id: "5",
    title: "How to identify and resolve IP address conflicts?",
    author: {
      name: "NetAdmin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NetAdmin",
    },
    date: "1 week ago",
    replies: 0,
    views: 45,
    tags: ["IP", "Conflicts", "DHCP"],
    solved: false,
  },
];

export default CommunityForum;

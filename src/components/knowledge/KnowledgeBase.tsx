import React, { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Tag,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

interface KnowledgeBaseProps {
  articles?: KnowledgeArticle[];
  selectedArticle?: string | null;
}

const defaultArticles: KnowledgeArticle[] = [
  {
    id: "1",
    title: "Understanding Network Latency Issues",
    description:
      "A comprehensive guide to identifying and resolving network latency problems in enterprise environments.",
    category: "Network Performance",
    tags: ["latency", "performance", "troubleshooting"],
    lastUpdated: "2023-10-15",
  },
  {
    id: "2",
    title: "Common DNS Configuration Errors",
    description:
      "Learn about the most frequent DNS configuration mistakes and how to fix them quickly.",
    category: "DNS",
    tags: ["dns", "configuration", "errors"],
    lastUpdated: "2023-09-22",
  },
  {
    id: "3",
    title: "Firewall Best Practices for Network Security",
    description:
      "Essential guidelines for configuring firewalls to maximize network security without compromising performance.",
    category: "Security",
    tags: ["firewall", "security", "configuration"],
    lastUpdated: "2023-11-05",
  },
  {
    id: "4",
    title: "Troubleshooting VPN Connection Issues",
    description:
      "Step-by-step guide to diagnosing and resolving common VPN connectivity problems.",
    category: "VPN",
    tags: ["vpn", "connectivity", "troubleshooting"],
    lastUpdated: "2023-10-30",
  },
  {
    id: "5",
    title: "Wi-Fi Signal Optimization Techniques",
    description:
      "Advanced methods for improving Wi-Fi signal strength and reliability in various environments.",
    category: "Wireless",
    tags: ["wifi", "signal", "optimization"],
    lastUpdated: "2023-11-12",
  },
];

const ArticleList = ({
  articles,
  onSelectArticle,
}: {
  articles: KnowledgeArticle[];
  onSelectArticle: (id: string) => void;
}) => {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => onSelectArticle(article.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <Badge variant="secondary">{article.category}</Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {article.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {article.lastUpdated}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ArticleDetail = ({ article }: { article: KnowledgeArticle }) => {
  return (
    <div className="space-y-6 bg-card p-6 rounded-xl border">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <Badge variant="secondary">{article.category}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {article.lastUpdated}
        </div>
        <div className="flex gap-2 mb-6">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>
          This is a detailed article about {article.title.toLowerCase()}. The
          content provides comprehensive information about the topic, including
          common issues, troubleshooting steps, and best practices.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Common Issues</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Issue one related to {article.category.toLowerCase()}</li>
          <li>Issue two related to {article.category.toLowerCase()}</li>
          <li>Issue three related to {article.category.toLowerCase()}</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Troubleshooting Steps
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>First step to diagnose the problem</li>
          <li>Second step to identify the root cause</li>
          <li>Third step to implement the solution</li>
          <li>Fourth step to verify the fix</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">Best Practices</h3>
        <p>
          Follow these best practices to prevent issues related to{" "}
          {article.category.toLowerCase()}:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Best practice one</li>
          <li>Best practice two</li>
          <li>Best practice three</li>
        </ul>
      </div>

      <div className="mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

const KnowledgeBase = ({
  articles = defaultArticles,
  selectedArticle = null,
}: KnowledgeBaseProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    selectedArticle,
  );

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    if (activeTab === "all") return matchesSearch;
    return (
      article.category.toLowerCase() === activeTab.toLowerCase() &&
      matchesSearch
    );
  });

  const categories = [
    "All",
    ...Array.from(new Set(articles.map((article) => article.category))),
  ];

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
  };

  const handleBackToList = () => {
    setSelectedArticleId(null);
  };

  const selectedArticleData = articles.find(
    (article) => article.id === selectedArticleId,
  );

  return (
    <div className="w-full h-full bg-background text-foreground p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
          </div>
          {selectedArticleId && (
            <Button
              variant="ghost"
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Articles
            </Button>
          )}
        </div>

        {!selectedArticleId ? (
          <>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="w-full justify-start overflow-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category.toLowerCase()}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {filteredArticles.length > 0 ? (
              <ArticleList
                articles={filteredArticles}
                onSelectArticle={handleSelectArticle}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles found matching your search criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        ) : (
          selectedArticleData && <ArticleDetail article={selectedArticleData} />
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;

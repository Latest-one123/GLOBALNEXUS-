import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface BreakingNews {
  id: string;
  title: string;
  time: string;
}

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // todo: remove mock functionality
  const breakingNews: BreakingNews[] = [
    { id: "1", title: "Global Climate Summit Reaches Historic Agreement", time: "2 min ago" },
    { id: "2", title: "Tech Giants Announce AI Safety Standards", time: "15 min ago" },
    { id: "3", title: "International Trade Deal Signed", time: "32 min ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  const currentNews = breakingNews[currentIndex];

  return (
    <div className="bg-destructive text-destructive-foreground py-2 px-4 animate-pulse" data-testid="breaking-news-ticker">
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 shrink-0">
          <AlertCircle className="w-4 h-4 animate-pulse" />
          <Badge variant="outline" className="bg-destructive-foreground text-destructive border-destructive-foreground">
            BREAKING
          </Badge>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-medium" data-testid="text-breaking-news">
              {currentNews.title}
            </span>
            <span className="ml-4 text-sm opacity-75" data-testid="text-breaking-time">
              {currentNews.time}
            </span>
          </div>
        </div>

        <div className="flex gap-1 shrink-0">
          {breakingNews.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-destructive-foreground" : "bg-destructive-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
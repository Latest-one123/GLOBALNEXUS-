import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsCategory } from "./CategoryFilter";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  publishedAt: string;
  readTime: string;
  imageUrl?: string;
  author: string;
  views: number;
  isBreaking?: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
  variant?: "standard" | "featured" | "compact";
  onRead?: (articleId: string) => void;
  onShare?: (articleId: string) => void;
}

export default function NewsCard({ 
  article, 
  variant = "standard",
  onRead,
  onShare 
}: NewsCardProps) {
  const handleRead = () => {
    onRead?.(article.id);
    console.log(`Reading article: ${article.title}`);
  };

  const handleShare = () => {
    onShare?.(article.id);
    console.log(`Sharing article: ${article.title}`);
  };

  const getCategoryColor = (category: NewsCategory) => {
    switch (category) {
      case "politics": return "bg-primary text-primary-foreground";
      case "technology": return "bg-chart-3 text-white";
      case "sports": return "bg-chart-4 text-white";
      case "business": return "bg-chart-1 text-white";
      case "world": return "bg-chart-2 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover-elevate active-elevate-2 group cursor-pointer" onClick={handleRead} data-testid={`card-news-${article.id}`}>
        <div className="relative h-64 overflow-hidden">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              {article.isBreaking && (
                <Badge variant="destructive" className="animate-pulse">
                  BREAKING
                </Badge>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-foreground" data-testid="text-article-title">
              {article.title}
            </h2>
            <p className="text-white/80 text-sm line-clamp-2" data-testid="text-article-summary">
              {article.summary}
            </p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span data-testid="text-article-author">{article.author}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span data-testid="text-article-time">{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span data-testid="text-article-views">{article.views}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleShare(); }} data-testid="button-share">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 group cursor-pointer" onClick={handleRead} data-testid={`card-news-${article.id}`}>
      <div className="flex">
        {article.imageUrl && (
          <div className="w-32 h-24 shrink-0 overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>
            {article.isBreaking && (
              <Badge variant="destructive" className="animate-pulse">
                BREAKING
              </Badge>
            )}
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary" data-testid="text-article-title">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid="text-article-summary">
            {article.summary}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span data-testid="text-article-author">{article.author}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span data-testid="text-article-time">{article.publishedAt}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleShare(); }} className="h-6 w-6" data-testid="button-share">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
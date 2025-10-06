import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp } from "lucide-react";
import heroImage from '@assets/generated_images/Hero_news_banner_image_bae0e00f.png';

interface HeroArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  category: string;
  isBreaking?: boolean;
}

export default function HeroSection() {
  // todo: remove mock functionality
  const featuredArticle: HeroArticle = {
    id: "hero-1",
    title: "International Climate Summit Reaches Breakthrough Agreement",
    summary: "World leaders from 195 countries unite on historic climate action plan, setting unprecedented targets for carbon reduction and renewable energy transition by 2030.",
    author: "Elena Rodriguez",
    publishedAt: "Breaking News",
    category: "World",
    isBreaking: true
  };

  const handleReadMore = () => {
    console.log(`Reading featured article: ${featuredArticle.title}`);
  };

  const handleWatchVideo = () => {
    console.log("Playing featured video");
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Hero news background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {/* Category and Breaking Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary text-primary-foreground">
                {featuredArticle.category}
              </Badge>
              {featuredArticle.isBreaking && (
                <Badge variant="destructive" className="animate-pulse">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  BREAKING NEWS
                </Badge>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              {featuredArticle.title}
            </h1>

            {/* Summary */}
            <p className="text-lg text-white/90 mb-8 leading-relaxed" data-testid="text-hero-summary">
              {featuredArticle.summary}
            </p>

            {/* Author and Time */}
            <div className="flex items-center gap-4 mb-8 text-white/80">
              <span className="font-medium" data-testid="text-hero-author">
                By {featuredArticle.author}
              </span>
              <span className="text-sm" data-testid="text-hero-time">
                {featuredArticle.publishedAt}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={handleReadMore}
                className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-border"
                data-testid="button-hero-read"
              >
                Read Full Story
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWatchVideo}
                className="bg-background/10 backdrop-blur text-white border-white/30 hover:bg-background/20"
                data-testid="button-hero-video"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
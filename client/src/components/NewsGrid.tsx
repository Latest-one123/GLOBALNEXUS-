import NewsCard from "./NewsCard";
import type { NewsCategory } from "./CategoryFilter";
import heroImage from '@assets/generated_images/Hero_news_banner_image_bae0e00f.png';
import techImage from '@assets/generated_images/Technology_news_placeholder_f2e7332c.png';
import politicsImage from '@assets/generated_images/Politics_news_placeholder_c8a4649d.png';
import sportsImage from '@assets/generated_images/Sports_news_placeholder_c5ad2fc0.png';

interface NewsGridProps {
  selectedCategory: NewsCategory;
}

export default function NewsGrid({ selectedCategory }: NewsGridProps) {
  // todo: remove mock functionality
  const allArticles = [
    {
      id: "1",
      title: "Global Climate Summit Reaches Historic Agreement",
      summary: "World leaders unite on ambitious climate targets, setting new standards for carbon emissions and renewable energy adoption worldwide.",
      category: "world" as const,
      publishedAt: "2 hours ago",
      readTime: "5 min read",
      imageUrl: heroImage,
      author: "Sarah Chen",
      views: 12500,
      isBreaking: true
    },
    {
      id: "2",
      title: "AI Revolution Transforms Healthcare Industry",
      summary: "Machine learning algorithms show 95% accuracy in early disease detection, promising faster diagnoses and better patient outcomes.",
      category: "technology" as const,
      publishedAt: "4 hours ago",
      readTime: "3 min read",
      imageUrl: techImage,
      author: "Michael Rodriguez",
      views: 8200,
      isBreaking: false
    },
    {
      id: "3",
      title: "International Trade Agreement Reshapes Global Markets",
      summary: "New multilateral trade deal expected to boost economic growth across participating nations while addressing environmental concerns.",
      category: "politics" as const,
      publishedAt: "6 hours ago",
      readTime: "4 min read",
      imageUrl: politicsImage,
      author: "Amanda Foster",
      views: 9800,
      isBreaking: false
    },
    {
      id: "4",
      title: "World Championship Finals Draw Record Viewership",
      summary: "Historic sports event captures global attention with innovative broadcast technology and unprecedented fan engagement.",
      category: "sports" as const,
      publishedAt: "8 hours ago",
      readTime: "2 min read",
      imageUrl: sportsImage,
      author: "James Park",
      views: 15600,
      isBreaking: false
    },
    {
      id: "5",
      title: "Cryptocurrency Market Hits New Milestone",
      summary: "Digital currencies reach unprecedented adoption rates as institutional investors embrace blockchain technology.",
      category: "business" as const,
      publishedAt: "10 hours ago",
      readTime: "4 min read",
      imageUrl: techImage,
      author: "Lisa Wang",
      views: 7300,
      isBreaking: false
    },
    {
      id: "6",
      title: "Space Mission Discovers Potential Signs of Life",
      summary: "Revolutionary findings from deep space exploration mission could change our understanding of life in the universe.",
      category: "technology" as const,
      publishedAt: "12 hours ago",
      readTime: "6 min read",
      imageUrl: heroImage,
      author: "David Kumar",
      views: 22100,
      isBreaking: true
    }
  ];

  const filteredArticles = selectedCategory === "all" 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  const handleReadArticle = (articleId: string) => {
    console.log(`Reading article: ${articleId}`);
  };

  const handleShareArticle = (articleId: string) => {
    console.log(`Sharing article: ${articleId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2" data-testid="text-news-grid-title">
          {selectedCategory === "all" ? "Latest News" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
        </h2>
        <p className="text-muted-foreground">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onRead={handleReadArticle}
              onShare={handleShareArticle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
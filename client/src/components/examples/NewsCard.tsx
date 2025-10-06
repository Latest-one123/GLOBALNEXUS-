import NewsCard from '../NewsCard';
import heroImage from '@assets/generated_images/Hero_news_banner_image_bae0e00f.png';
import techImage from '@assets/generated_images/Technology_news_placeholder_f2e7332c.png';

export default function NewsCardExample() {
  const sampleArticle = {
    id: "1",
    title: "Breaking: Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    summary: "World leaders unite on ambitious climate targets, setting new standards for carbon emissions and renewable energy adoption worldwide.",
    category: "world" as const,
    publishedAt: "2 hours ago",
    readTime: "5 min read",
    imageUrl: heroImage,
    author: "Sarah Chen",
    views: 12500,
    isBreaking: true
  };

  const compactArticle = {
    id: "2",
    title: "Tech Innovation Drives Market Growth",
    summary: "Latest developments in AI and automation continue to reshape global markets.",
    category: "technology" as const,
    publishedAt: "4 hours ago",
    readTime: "3 min read",
    imageUrl: techImage,
    author: "Michael Rodriguez",
    views: 8200,
    isBreaking: false
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Featured Article</h3>
        <NewsCard 
          article={sampleArticle} 
          variant="featured"
          onRead={(id) => console.log('Reading article:', id)}
          onShare={(id) => console.log('Sharing article:', id)}
        />
      </div>
      
      <div>
        <h3 className="mb-4 font-semibold">Standard Article</h3>
        <NewsCard 
          article={compactArticle}
          onRead={(id) => console.log('Reading article:', id)}
          onShare={(id) => console.log('Sharing article:', id)}
        />
      </div>
    </div>
  );
}
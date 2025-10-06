import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type NewsCategory = "all" | "politics" | "technology" | "sports" | "business" | "world";

interface CategoryFilterProps {
  onCategoryChange?: (category: NewsCategory) => void;
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");

  const categories = [
    { id: "all" as const, label: "All News", labelAr: "جميع الأخبار" },
    { id: "politics" as const, label: "Politics", labelAr: "سياسة" },
    { id: "technology" as const, label: "Technology", labelAr: "تكنولوجيا" },
    { id: "sports" as const, label: "Sports", labelAr: "رياضة" },
    { id: "business" as const, label: "Business", labelAr: "اقتصاد" },
    { id: "world" as const, label: "World", labelAr: "عالم" },
  ];

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
    console.log(`Category changed to: ${category}`);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 border-b border-border" data-testid="category-filter">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "ghost"}
          size="sm"
          onClick={() => handleCategoryChange(category.id)}
          className="hover-elevate active-elevate-2 flex items-center gap-2"
          data-testid={`button-category-${category.id}`}
        >
          {category.label}
          {activeCategory === category.id && (
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
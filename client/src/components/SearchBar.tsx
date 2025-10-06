import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search news..." }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch?.(searchQuery);
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsExpanded(false);
    onSearch?.("");
  };

  return (
    <div className="relative flex items-center">
      <div className={`flex items-center transition-all duration-300 ${
        isExpanded ? "w-80" : "w-10"
      }`}>
        <div className="relative flex-1">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholder}
            className={`pr-8 transition-all duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 w-0"
            }`}
            data-testid="input-search"
          />
          {searchQuery && isExpanded && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 hover-elevate"
              data-testid="button-clear-search"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={isExpanded ? handleSearch : () => setIsExpanded(true)}
        className="hover-elevate active-elevate-2 ml-2"
        data-testid="button-search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
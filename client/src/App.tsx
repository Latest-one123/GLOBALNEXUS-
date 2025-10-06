import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AdminPage from "@/pages/admin";
import LoginPage from "@/pages/login";
import SetupPage from "@/pages/setup";
import ProtectedRoute from "./components/ProtectedRoute";

import Navigation from "./components/Navigation";
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import HeroSection from "./components/HeroSection";
import CategoryFilter, { type NewsCategory } from "./components/CategoryFilter";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all");

  const handleCategoryChange = (category: NewsCategory) => {
    setSelectedCategory(category);
    console.log(`Category changed to: ${category}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breaking News Ticker */}
      <BreakingNewsTicker />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Filter */}
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      
      {/* News Grid */}
      <NewsGrid selectedCategory={selectedCategory} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/setup" component={SetupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin">
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      </Route>
      <Route path="/world" component={() => <div className="p-8 text-center">World News Page - Coming Soon</div>} />
      <Route path="/politics" component={() => <div className="p-8 text-center">Politics News Page - Coming Soon</div>} />
      <Route path="/technology" component={() => <div className="p-8 text-center">Technology News Page - Coming Soon</div>} />
      <Route path="/sports" component={() => <div className="p-8 text-center">Sports News Page - Coming Soon</div>} />
      <Route path="/business" component={() => <div className="p-8 text-center">Business News Page - Coming Soon</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
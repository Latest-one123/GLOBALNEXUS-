import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Newspaper } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Home", labelAr: "الرئيسية", href: "/" },
    { label: "World", labelAr: "عالم", href: "/world" },
    { label: "Politics", labelAr: "سياسة", href: "/politics" },
    { label: "Technology", labelAr: "تكنولوجيا", href: "/technology" },
    { label: "Sports", labelAr: "رياضة", href: "/sports" },
    { label: "Business", labelAr: "اقتصاد", href: "/business" },
  ];

  const handleNavClick = (href: string) => {
    console.log(`Navigating to: ${href}`);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Newspaper className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-primary" data-testid="text-logo">
              Global News
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              International News Network
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              onClick={() => handleNavClick(item.href)}
              className="hover-elevate active-elevate-2"
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <LanguageToggle />
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-6">
                <div className="md:hidden mb-4">
                  <SearchBar />
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      className="justify-start hover-elevate"
                      data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
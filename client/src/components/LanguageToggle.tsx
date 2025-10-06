import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

type Language = "en" | "ar";

interface LanguageToggleProps {
  onLanguageChange?: (language: Language) => void;
}

export default function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    onLanguageChange?.(language);
    console.log(`Language changed to: ${language}`);
    
    // Apply RTL for Arabic
    if (language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  };

  return (
    <div className="flex items-center gap-2" data-testid="language-toggle">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex border border-border rounded-md overflow-hidden">
        <Button
          variant={currentLanguage === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleLanguageChange("en")}
          className="rounded-none px-3 py-1 text-xs"
          data-testid="button-language-en"
        >
          EN
        </Button>
        <Button
          variant={currentLanguage === "ar" ? "default" : "ghost"}
          size="sm"
          onClick={() => handleLanguageChange("ar")}
          className="rounded-none px-3 py-1 text-xs"
          data-testid="button-language-ar"
        >
          العربية
        </Button>
      </div>
    </div>
  );
}
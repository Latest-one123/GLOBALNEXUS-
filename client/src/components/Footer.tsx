import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Newsletter subscription: ${email}`);
    setEmail("");
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Opening ${platform} social media`);
  };

  const navigationSections = [
    {
      title: "News Categories",
      links: [
        { label: "World News", href: "/world" },
        { label: "Politics", href: "/politics" },
        { label: "Technology", href: "/technology" },
        { label: "Sports", href: "/sports" },
        { label: "Business", href: "/business" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ]
    }
  ];

  return (
    <footer className="bg-card border-t border-card-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-primary">Global News</h3>
                <p className="text-sm text-muted-foreground">International News Network</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted source for international news, delivering accurate and timely information 
              from around the world in English and Arabic.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  data-testid="input-newsletter"
                />
                <Button type="submit" data-testid="button-newsletter-submit">
                  <Mail className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick("Facebook")} data-testid="button-social-facebook">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick("Twitter")} data-testid="button-social-twitter">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick("Instagram")} data-testid="button-social-instagram">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSocialClick("YouTube")} data-testid="button-social-youtube">
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => console.log(`Navigating to: ${link.href}`)}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>&copy; 2024 Global News Network. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Button variant="ghost" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
              Accessibility
            </Button>
            <Button variant="ghost" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
              RSS Feed
            </Button>
            <Button variant="ghost" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
              Mobile App
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
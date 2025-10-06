# Design Guidelines: International News Platform

## Design Approach
**Reference-Based Approach** - Drawing inspiration from leading international news platforms (BBC, CNN, Reuters, Al Jazeera) while creating a distinctive visual identity that balances information density with engaging visual storytelling.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Dark Blue: 220 85% 25% (main brand color, headers, navigation)
- Dark Red: 0 70% 35% (breaking news, urgent alerts, accent elements)
- White: 0 0% 100% (text, backgrounds, contrast)
- Bright Red: 0 85% 50% (call-to-action buttons, live indicators)

**Gradient Applications:**
- Hero sections: Subtle blue-to-dark blue gradients (220 85% 35% to 220 85% 15%)
- Breaking news banners: Red gradient overlays (0 70% 45% to 0 70% 25%)
- Category headers: Multi-directional gradients combining blue and red tones

### Typography
**Font Families:**
- Headlines: Inter or Roboto (700-900 weight) - strong, authoritative
- Body Text: Source Sans Pro or Open Sans (400-600 weight) - highly readable
- Arabic Support: Noto Sans Arabic or Cairo for RTL content

**Hierarchy:**
- H1: 3xl-4xl for main headlines
- H2: 2xl-3xl for section headers  
- H3: xl-2xl for article titles
- Body: base-lg for optimal reading

### Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Micro spacing (p-2, m-2): Form elements, button padding
- Standard spacing (p-4, m-4): Card padding, section gaps
- Medium spacing (p-6, m-6): Component separation
- Large spacing (p-8, m-8): Section breaks, hero padding

### Component Library

**Navigation:**
- Sticky top navigation with language toggle (Arabic/English)
- Hamburger menu for mobile with smooth slide transitions
- Category tabs with hover animations and active states

**News Cards:**
- Featured story: Large image with gradient overlay and bold headline
- Standard cards: Image, headline, timestamp, category tag
- Breaking news: Red accent border with pulsing live indicator
- Trending articles: Numbered list with subtle animations

**Interactive Elements:**
- Search bar with expanding animation and filtering options
- Share buttons with subtle hover effects
- Comment sections with threaded replies
- Newsletter signup with success micro-interactions

**Data Displays:**
- Weather widgets with location-based information
- Stock market tickers with real-time updates
- Interactive maps for location-based news
- Timeline components for developing stories

### Bilingual Considerations
- RTL layout support for Arabic content with proper text alignment
- Dual navigation systems with seamless language switching
- Consistent component spacing regardless of text direction
- Font loading strategies for both Latin and Arabic scripts

### Motion & Visual Effects
**Subtle Animations (Use Sparingly):**
- Parallax scrolling on hero images (minimal 0.3x speed)
- Fade-in animations for article loading
- Smooth transitions between news categories
- Micro-interactions on buttons and form elements

**Performance-Focused Effects:**
- CSS transforms for hover states
- Intersection Observer for scroll-triggered animations
- Optimized image loading with blur-to-focus transitions

### Images
**Hero Section:**
- Large hero image (full viewport width) with breaking news or featured story
- Dark gradient overlay (opacity 0.4-0.6) for text readability
- Buttons with blurred backgrounds when placed over images

**Content Images:**
- High-quality news photography with consistent aspect ratios
- Lazy loading implementation for performance
- Responsive images with proper alt text for accessibility
- Category-specific placeholder images for consistency

### Advanced Features Integration
- AI-powered article recommendations sidebar
- Interactive news maps with location pins
- Real-time breaking news notifications
- Social media integration widgets
- Video player with custom controls matching brand colors

This design system creates a professional, trustworthy news platform that respects both Arabic and English reading patterns while providing an engaging, modern user experience that rivals international news websites.
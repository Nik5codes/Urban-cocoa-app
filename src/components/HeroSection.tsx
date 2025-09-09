import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onShopNow: () => void;
  onLearnMore?: () => void;
}

export function HeroSection({ onShopNow, onLearnMore }: HeroSectionProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1645741025235-0df79bdc9e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwbHV4dXJ5fGVufDF8fHx8MTc1Njc4ODgwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury chocolate desserts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-white">
            Artisan Chocolate Crafted with Love
          </h1>
          <p className="mb-8 text-lg text-white/90 max-w-xl">
            Discover our premium collection of handcrafted chocolates, made with the finest 
            cocoa beans from around the world. Each piece is a work of art that melts in your mouth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={onShopNow}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={onLearnMore || onShopNow}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
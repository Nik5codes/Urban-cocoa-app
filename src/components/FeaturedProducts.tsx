import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
}

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export function FeaturedProducts({ onAddToCart, onViewAll }: FeaturedProductsProps) {
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Dark Chocolate Deluxe Bar",
      description: "Rich 70% cocoa dark chocolate with hints of vanilla and sea salt",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Best Seller"
    },
    {
      id: "2",
      name: "Milk Chocolate Truffles",
      description: "Creamy milk chocolate truffles filled with smooth ganache",
      price: 24.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1715663760594-5250f3261fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2hvY29sYXRlJTIwdHJ1ZmZsZXxlbnwxfHx8fDE3NTY3ODg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "New"
    },
    {
      id: "3",
      name: "White Chocolate Bonbons",
      description: "Elegant white chocolate bonbons with exotic fruit fillings",
      price: 29.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Premium"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular artisan chocolates, carefully selected for their 
            exceptional quality and taste.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={onViewAll}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Search, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  category: string;
}

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
}

export function ProductsPage({ onAddToCart }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const allProducts: Product[] = [
    {
      id: "1",
      name: "Dark Chocolate Deluxe Bar",
      description: "Rich 70% cocoa dark chocolate with hints of vanilla and sea salt",
      price: 1099,
      originalPrice: 1399,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Best Seller",
      category: "bars"
    },
    {
      id: "2",
      name: "Milk Chocolate Truffles",
      description: "Creamy milk chocolate truffles filled with smooth ganache",
      price: 2099,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1715663760594-5250f3261fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2hvY29sYXRlJTIwdHJ1ZmZsZXxlbnwxfHx8fDE3NTY3ODg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "New",
      category: "truffles"
    },
    {
      id: "3",
      name: "White Chocolate Bonbons",
      description: "Elegant white chocolate bonbons with exotic fruit fillings",
      price: 2499,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Premium",
      category: "bonbons"
    },
    {
      id: "4",
      name: "Chocolate Assortment Box",
      description: "Curated selection of our finest chocolates in a beautiful gift box",
      price: 3899,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1635843945732-08f2cc685f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBhc3NvcnRtZW50JTIwYm94fGVufDF8fHx8MTc1Njc4ODg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "boxes"
    },
    {
      id: "5",
      name: "Artisan Chocolate Bars Collection",
      description: "Set of 6 unique artisan chocolate bars with different flavor profiles",
      price: 3299,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1569622701449-32fe4e90e492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hvY29sYXRlJTIwYmFyc3xlbnwxfHx8fDE3NTY3ODg4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "bars"
    },
    {
      id: "6",
      name: "Luxury Pralines Collection",
      description: "Hand-dipped pralines with various nuts and caramel fillings",
      price: 2799,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1668574181450-296ad0595177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBwcmFsaW5lcyUyMGx1eHVyeXxlbnwxfHx8fDE3NTY3ODg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "pralines"
    }
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "bars", label: "Chocolate Bars" },
    { value: "truffles", label: "Truffles" },
    { value: "bonbons", label: "Bonbons" },
    { value: "pralines", label: "Pralines" },
    { value: "boxes", label: "Gift Boxes" }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4">Our Chocolate Collection</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our full range of artisan chocolates, from classic favorites to innovative creations.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
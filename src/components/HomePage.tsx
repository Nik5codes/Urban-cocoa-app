import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Heart, Award, Users, Leaf, Globe, ArrowRight, Quote } from "lucide-react";

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

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
}

export function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const premiumProducts = [
    {
      id: "1",
      name: "Dark Chocolate Excellence",
      description: "85% pure cocoa from Ecuador",
      price: 2499,
      originalPrice: 2899,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1586400928533-da0dbdca07fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXIlMjBkYXJrJTIwbHV4dXJ5JTIwcGFja2FnaW5nfGVufDF8fHx8MTc1NjgwNDQwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Limited Edition"
    },
    {
      id: "2",
      name: "Golden Truffle Collection",
      description: "Hand-crafted with gold leaf",
      price: 4199,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1714173684344-867bf6e3b41d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwY2hvY29sYXRlJTIwYm9uYm9ucyUyMGdvbGR8ZW58MXx8fHwxNzU2ODA0NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Signature"
    },
    {
      id: "3",
      name: "Artisan Bonbon Set",
      description: "12 unique flavor profiles",
      price: 3399,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1729875749042-695a49842f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0cnVmZmxlcyUyMGVsZWdhbnQlMjBkaXNwbGF5fGVufDF8fHx8MTc1NjgwNDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Best Seller"
    }
  ];

  const testimonials = [
    {
      name: "Sophie Martinez",
      role: "Food Critic",
      content: "Urban Cocoa has redefined what premium chocolate means. Each piece is a masterpiece of flavor and craftsmanship.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1672527843075-2a7a0ca859ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzU2NzkzNTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "James Chen",
      role: "Michelin Star Chef",
      content: "The quality and attention to detail in every piece is extraordinary. I use Urban Cocoa exclusively in my restaurant.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1755545622065-f710f6ced8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY4MDQ0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Emma Thompson",
      role: "Luxury Lifestyle Blogger",
      content: "Urban Cocoa doesn't just make chocolate - they create edible art. Every bite is pure indulgence.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1619107187499-adbfd254e9ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9uZGUlMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjgwNDQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#702b00' }}>
      {/* Hero Section */}
      <section className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1619615174792-a5edcfeafdfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvYSUyMGJlYW5zJTIwY2hvY29sYXRlJTIwbHV4dXJ5JTIwZGFya3xlbnwxfHx8fDE3NTY4MDQzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Premium cocoa beans"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#702b00]/50 to-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl md:text-7xl font-bold text-white tracking-tight">
              URBAN COCOA
            </h1>
            <p className="mb-8 text-xl md:text-2xl text-[#FFD700] font-light max-w-2xl mx-auto">
              Artisan chocolate crafted with passion, perfection, and the finest cocoa from around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FFD700] text-[#702b00] hover:bg-[#FFD700]/90 px-8 py-4 text-lg font-semibold shadow-2xl"
                onClick={() => onNavigate('products')}
              >
                Request Samples
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#702b00] px-8 py-4 text-lg font-semibold"
                onClick={() => onNavigate('products')}
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-[#702b00] to-[#8B4513]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-xl text-[#F5F5DC] max-w-3xl mx-auto leading-relaxed">
              Founded by master chocolatiers with over 30 years of experience, Urban Cocoa represents 
              the pinnacle of chocolate craftsmanship, where tradition meets innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-[#702b00]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Sustainable Sourcing</h3>
              <p className="text-[#F5F5DC] leading-relaxed">
                We partner directly with cocoa farmers, ensuring fair trade practices and the highest quality beans while supporting local communities.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-[#702b00]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Award-Winning Quality</h3>
              <p className="text-[#F5F5DC] leading-relaxed">
                Recognized by international chocolate competitions for our exceptional flavor profiles and innovative techniques.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#FFD700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-[#702b00]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Crafted with Love</h3>
              <p className="text-[#F5F5DC] leading-relaxed">
                Every piece is handcrafted by our master chocolatiers, ensuring each bite delivers an extraordinary experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Products Section */}
      <section className="py-24 bg-gradient-to-b from-[#8B4513] to-[#A0522D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Premium Products</h2>
            <p className="text-xl text-[#F5F5DC] max-w-2xl mx-auto">
              Discover our signature collection of luxury chocolates, each crafted to perfection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premiumProducts.map((product, index) => (
              <Card key={product.id} className="group overflow-hidden bg-white/10 backdrop-blur-sm border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300 hover:scale-105 shadow-2xl">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#FFD700] text-[#702b00] px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#FFD700] text-[#FFD700]"
                            : "text-[#FFD700]/30"
                        }`}
                      />
                    ))}
                    <span className="text-[#FFD700] ml-2 font-semibold">{product.rating}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-[#F5F5DC] mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#FFD700]">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[#F5F5DC]/70 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#FFD700] text-[#702b00] hover:bg-[#FFD700]/90 font-semibold"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('products')}
              className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#702b00] px-8 py-4 text-lg font-semibold"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-[#A0522D] to-[#8B4513]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-[#F5F5DC] max-w-2xl mx-auto">
              Trusted by food critics, chefs, and chocolate enthusiasts worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-[#FFD700]/20 shadow-2xl">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-[#FFD700] mb-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>
                  <p className="text-[#F5F5DC] mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-[#FFD700] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-[#8B4513] to-[#702b00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience Luxury?</h2>
            <p className="text-xl text-[#F5F5DC] mb-12 max-w-2xl mx-auto">
              Join the Urban Cocoa family and discover the world's finest artisan chocolates
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-[#702b00]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Worldwide Shipping</h3>
                <p className="text-[#F5F5DC]">Premium packaging ensures freshness</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#702b00]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Consultation</h3>
                <p className="text-[#F5F5DC]">Personalized recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#702b00]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Guarantee</h3>
                <p className="text-[#F5F5DC]">100% satisfaction promise</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FFD700] text-[#702b00] hover:bg-[#FFD700]/90 px-12 py-4 text-lg font-semibold shadow-2xl"
                onClick={() => onNavigate('products')}
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#702b00] px-12 py-4 text-lg font-semibold"
                onClick={() => onNavigate('login')}
              >
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
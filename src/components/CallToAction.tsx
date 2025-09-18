import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Gift, Truck, Shield } from "lucide-react";

interface CallToActionProps {
  onGetStarted: () => void;
}

export function CallToAction({ onGetStarted }: CallToActionProps) {
  const features = [
    {
      icon: Gift,
      title: "Premium Quality",
      description: "Handcrafted with the finest ingredients"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: Shield,
      title: "Satisfaction Guaranteed",
      description: "30-day money-back guarantee"
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-none shadow-sm">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <h2 className="mb-4">Ready to Indulge?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of chocolate lovers who trust Urban Cocoa for their premium chocolate needs. 
            Experience the difference that quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary/90"
            >
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
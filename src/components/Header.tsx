import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItemCount?: number;
}

export function Header({ currentPage, onPageChange, cartItemCount = 0 }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground">🍫</span>
            </div>
            <span className="text-xl text-primary">Urban Cocoa</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'home' 
                  ? 'text-primary bg-secondary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('products')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'products' 
                  ? 'text-primary bg-secondary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onPageChange('orders')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'orders' 
                  ? 'text-primary bg-secondary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Orders
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange('cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange('login')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <button
                    onClick={() => {
                      onPageChange('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === 'home' 
                        ? 'text-primary bg-secondary' 
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  > 
                    Home
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('products');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === 'products' 
                        ? 'text-primary bg-secondary' 
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  >
                    Products
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('orders');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === 'orders' 
                        ? 'text-primary bg-secondary' 
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('cart');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === 'cart' 
                        ? 'text-primary bg-secondary' 
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  >
                    Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === 'login' 
                        ? 'text-primary bg-secondary' 
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  >
                    Account
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
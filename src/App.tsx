import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProductsPage } from "./components/ProductsPage";
import { CartPage } from "./components/CartPage";
import { LoginPage } from "./components/LoginPage";
import { OrdersPage } from "./components/OrdersPage";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminProducts } from "./components/AdminProducts";
import { AdminOrders } from "./components/AdminOrders";
import { AdminRetailers } from "./components/AdminRetailers";
import { AdminSettings } from "./components/AdminSettings";
import { Toaster } from "./components/ui/sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  category?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  items: OrderItem[];
  estimatedDelivery?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSection, setAdminSection] = useState("dashboard");

  // Sample orders data
  const sampleOrders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-08-15",
      status: "delivered",
      total: 3598,
      items: [
        {
          id: "1",
          name: "Dark Chocolate Deluxe Bar",
          quantity: 2,
          price: 1099,
          image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: "3",
          name: "White Chocolate Bonbons",
          quantity: 1,
          price: 2499,
          image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-08-20",
      status: "shipped",
      total: 2099,
      items: [
        {
          id: "2",
          name: "Milk Chocolate Truffles",
          quantity: 1,
          price: 2099,
          image: "https://images.unsplash.com/photo-1715663760594-5250f3261fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2hvY29sYXRlJTIwdHJ1ZmZsZXxlbnwxfHx8fDE3NTY3ODg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      estimatedDelivery: "2024-09-05"
    }
  ];

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast(`Added another ${product.name} to cart`);
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
      toast(`${product.name} added to cart!`);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(cartItems.filter(item => item.id !== id));
    if (item) {
      toast(`${item.name} removed from cart`);
    }
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login logic with basic validation
    if (!email || !password) {
      toast("Please fill in all fields");
      return false;
    }
    
    if (!email.includes('@')) {
      toast("Please enter a valid email address");
      return false;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoggedIn(true);
      if (email === "admin@urbancocoa.com") {
        setIsAdmin(true);
        setCurrentPage("admin");
        toast("Welcome back, Admin!");
      } else {
        setCurrentPage("home");
        toast(`Welcome back, ${email.split('@')[0]}!`);
      }
    }, 500);
    
    return true;
  };

  const handleRegister = (email: string, password: string, name: string) => {
    // Simulate registration logic with validation
    if (!email || !password || !name) {
      toast("Please fill in all fields");
      return false;
    }
    
    if (!email.includes('@')) {
      toast("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 6) {
      toast("Password must be at least 6 characters long");
      return false;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentPage("home");
      toast(`Welcome to Urban Cocoa, ${name}!`);
    }, 500);
    
    return true;
  };

  const handleCheckout = () => {
    // Simulate checkout process
    if (cartItems.length === 0) {
      toast("Your cart is empty!");
      return;
    }
    
    if (!isLoggedIn) {
      toast("Please log in to continue");
      setCurrentPage("login");
      return;
    }
    
    // Simulate processing
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    toast("Processing your order...", { duration: 1000 });
    
    setTimeout(() => {
      // Clear cart and show success
      setCartItems([]);
      toast(`Order placed successfully! Total: ₹${total}`, { duration: 3000 });
      setCurrentPage("orders");
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage("home");
    toast("You have been logged out");
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Admin Panel Layout
  if (isAdmin && currentPage === "admin") {
    const renderAdminSection = () => {
      switch (adminSection) {
        case "dashboard":
          return <AdminDashboard onNavigateToSection={setAdminSection} />;
        case "products":
          return <AdminProducts />;
        case "orders":
          return <AdminOrders />;
        case "retailers":
          return <AdminRetailers />;
        case "analytics":
          return <AdminDashboard onNavigateToSection={setAdminSection} />;
        case "settings":
          return <AdminSettings />;
        default:
          return <AdminDashboard onNavigateToSection={setAdminSection} />;
      }
    };

    return (
      <div className="flex h-screen bg-background">
        <AdminSidebar
          currentSection={adminSection}
          onSectionChange={setAdminSection}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {renderAdminSection()}
        </div>
      </div>
    );
  }

  // Customer Layout
  return (
    <div className="min-h-screen bg-background">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartItemCount={cartItemCount}
      />
      
      <main>
        {currentPage === "home" && (
          <HomePage
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {currentPage === "products" && (
          <ProductsPage onAddToCart={handleAddToCart} />
        )}
        
        {currentPage === "cart" && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onContinueShopping={() => setCurrentPage("products")}
          />
        )}
        
        {currentPage === "login" && (
          <LoginPage
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        )}
        
        {currentPage === "orders" && (
          <OrdersPage
            orders={isLoggedIn ? sampleOrders : []}
            onViewOrder={(orderId) => console.log("View order:", orderId)}
            onReorder={(order) => {
              // Add order items back to cart
              order.items.forEach(item => {
                const product: Product = {
                  id: item.id,
                  name: item.name,
                  description: "",
                  price: item.price,
                  rating: 4.5,
                  image: item.image
                };
                handleAddToCart(product);
              });
              toast(`${order.items.length} items added back to cart from order ${order.id}`);
              setCurrentPage("cart");
            }}
          />
        )}
      </main>
      <Toaster />
    </div>
  );
}
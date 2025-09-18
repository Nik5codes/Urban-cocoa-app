import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface AdminDashboardProps {
  onNavigateToSection?: (section: string) => void;
}

export function AdminDashboard({ onNavigateToSection }: AdminDashboardProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Total Orders",
      value: "2,345",
      change: "+180.1%",
      changeType: "positive",
      icon: ShoppingCart,
      description: "from last month"
    },
    {
      title: "Products Sold",
      value: "12,234",
      change: "+19%",
      changeType: "positive",
      icon: Package,
      description: "from last month"
    },
    {
      title: "Active Customers",
      value: "573",
      change: "-4.5%",
      changeType: "negative",
      icon: Users,
      description: "from last month"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      product: "Dark Chocolate Deluxe Bar",
      amount: "$12.99",
      status: "completed",
      date: "2 hours ago"
    },
    {
      id: "ORD-002",
      customer: "Mike Chen",
      product: "Milk Chocolate Truffles",
      amount: "$24.99",
      status: "processing",
      date: "4 hours ago"
    },
    {
      id: "ORD-003",
      customer: "Emma Davis",
      product: "White Chocolate Bonbons",
      amount: "$29.99",
      status: "shipped",
      date: "6 hours ago"
    },
    {
      id: "ORD-004",
      customer: "John Smith",
      product: "Chocolate Assortment Box",
      amount: "$45.99",
      status: "completed",
      date: "8 hours ago"
    }
  ];

  const topProducts = [
    {
      name: "Dark Chocolate Deluxe Bar",
      sales: 234,
      revenue: "$3,041.66",
      change: "+12%"
    },
    {
      name: "Milk Chocolate Truffles",
      sales: 189,
      revenue: "$4,723.11",
      change: "+8%"
    },
    {
      name: "Chocolate Assortment Box",
      sales: 156,
      revenue: "$7,174.44",
      change: "+24%"
    },
    {
      name: "White Chocolate Bonbons",
      sales: 134,
      revenue: "$4,016.66",
      change: "+15%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your chocolate business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.changeType === "positive" ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <ChangeIcon 
                    className={`h-3 w-3 ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`} 
                  />
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and their status</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateToSection?.("orders")}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">{order.amount}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigateToSection?.("products")}
            >
              View Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">{product.revenue}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">{product.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => onNavigateToSection?.("products")}
            >
              <Package className="h-6 w-6" />
              <span>Add Product</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => onNavigateToSection?.("orders")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Process Orders</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => onNavigateToSection?.("retailers")}
            >
              <Users className="h-6 w-6" />
              <span>Manage Retailers</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => onNavigateToSection?.("analytics")}
            >
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
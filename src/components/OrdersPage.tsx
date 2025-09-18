import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Package, Clock, CheckCircle, Truck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface OrdersPageProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onReorder: (order: Order) => void;
}

export function OrdersPage({ orders, onViewOrder, onReorder }: OrdersPageProps) {
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="mb-4">No orders yet</h2>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <Button size="lg">Start Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2">Order History</h1>
          <p className="text-muted-foreground">
            Track your orders and view your purchase history
          </p>
        </div>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>
                      Placed on {formatDate(order.date)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={`${getStatusColor(order.status)} flex items-center gap-1 mb-2`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                {order.estimatedDelivery && order.status !== "delivered" && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      Estimated delivery: {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id} className={index > 0 ? "border-t pt-4" : ""}>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                  <div className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total: ${order.total.toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewOrder(order.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onReorder(order)}
                    >
                      Reorder
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Orders</Button>
        </div>
      </div>
    </div>
  );
}
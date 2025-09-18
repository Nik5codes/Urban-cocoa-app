import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Eye, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.johnson@email.com",
      customerPhone: "+1 (555) 123-4567",
      date: "2024-08-25",
      status: "delivered",
      total: 42.97,
      paymentMethod: "Credit Card",
      trackingNumber: "1Z999AA1234567890",
      items: [
        {
          id: "1",
          name: "Dark Chocolate Deluxe Bar",
          quantity: 2,
          price: 12.99,
          image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: "3",
          name: "White Chocolate Bonbons",
          quantity: 1,
          price: 16.99,
          image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      shippingAddress: {
        street: "123 Maple Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        country: "USA"
      }
    },
    {
      id: "ORD-2024-002",
      customerName: "Mike Chen",
      customerEmail: "mike.chen@email.com",
      customerPhone: "+1 (555) 987-6543",
      date: "2024-08-26",
      status: "shipped",
      total: 24.99,
      paymentMethod: "PayPal",
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "2024-09-05",
      items: [
        {
          id: "2",
          name: "Milk Chocolate Truffles",
          quantity: 1,
          price: 24.99,
          image: "https://images.unsplash.com/photo-1715663760594-5250f3261fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2hvY29sYXRlJTIwdHJ1ZmZsZXxlbnwxfHx8fDE3NTY3ODg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      shippingAddress: {
        street: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA"
      }
    },
    {
      id: "ORD-2024-003",
      customerName: "Emma Davis",
      customerEmail: "emma.davis@email.com",
      customerPhone: "+1 (555) 246-8135",
      date: "2024-08-27",
      status: "processing",
      total: 67.97,
      paymentMethod: "Credit Card",
      items: [
        {
          id: "1",
          name: "Dark Chocolate Deluxe Bar",
          quantity: 1,
          price: 12.99,
          image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: "4",
          name: "Chocolate Assortment Box",
          quantity: 1,
          price: 45.99,
          image: "https://images.unsplash.com/photo-1635843945732-08f2cc685f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBhc3NvcnRtZW50JTIwYm94fGVufDF8fHx8MTc1Njc4ODg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      shippingAddress: {
        street: "789 Pine Road",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      }
    },
    {
      id: "ORD-2024-004",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      customerPhone: "+1 (555) 369-2580",
      date: "2024-08-27",
      status: "pending",
      total: 29.99,
      paymentMethod: "Credit Card",
      items: [
        {
          id: "3",
          name: "White Chocolate Bonbons",
          quantity: 1,
          price: 29.99,
          image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      shippingAddress: {
        street: "321 Cedar Lane",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA"
      }
    }
  ]);

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, trackingNumber: newStatus === 'shipped' ? 'TRK' + Date.now() : order.trackingNumber }
        : order
    ));
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

  const OrderDetailsDialog = ({ order }: { order: Order }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Order Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span>{order.paymentMethod}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracking:</span>
                  <span className="font-mono">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Update Status */}
          <div>
            <Label htmlFor="status">Update Status</Label>
            <Select 
              value={order.status} 
              onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Name: </span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email: </span>
                <span>{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Phone: </span>
                <span>{order.customerPhone}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <div className="text-sm space-y-1">
              <div>{order.shippingAddress.street}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </div>
              <div>{order.shippingAddress.country}</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Order Items */}
      <div>
        <h3 className="font-medium mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <div className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">Orders Management</h1>
          <p className="text-muted-foreground">
            Track and manage customer orders and shipments.
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Need processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'shipped').length}
            </div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Delivered orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {order.customerEmail}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="text-center">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  {order.trackingNumber && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.trackingNumber}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewOrder(order)}
                    className="h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Select 
                    value={order.status} 
                    onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}
                  >
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder ? `Order ${selectedOrder.id} - ${selectedOrder.customerName}` : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderDetailsDialog order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
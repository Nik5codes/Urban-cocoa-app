import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  MapPin,
  Phone,
  Mail,
  Building,
  TrendingUp,
  DollarSign,
  Package
} from "lucide-react";

interface Retailer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  type: "grocery" | "specialty" | "online" | "restaurant" | "cafe";
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastOrder: string;
  totalOrders: number;
  totalRevenue: number;
  commission: number; // percentage
  notes: string;
}

export function AdminRetailers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);

  // Sample retailers data
  const [retailers, setRetailers] = useState<Retailer[]>([
    {
      id: "RTL-001",
      name: "Sweet Delights Bakery",
      contactPerson: "Maria Rodriguez",
      email: "maria@sweetdelights.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "456 Baker Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        country: "USA"
      },
      type: "specialty",
      status: "active",
      joinDate: "2024-01-15",
      lastOrder: "2024-08-20",
      totalOrders: 45,
      totalRevenue: 12500.00,
      commission: 15,
      notes: "High-volume partner, always pays on time. Specializes in wedding cakes and desserts."
    },
    {
      id: "RTL-002",
      name: "Gourmet Foods Co.",
      contactPerson: "David Kim",
      email: "david@gourmetfoods.com",
      phone: "+1 (555) 987-6543",
      address: {
        street: "789 Commerce Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA"
      },
      type: "grocery",
      status: "active",
      joinDate: "2023-11-20",
      lastOrder: "2024-08-25",
      totalOrders: 123,
      totalRevenue: 35400.00,
      commission: 12,
      notes: "Large grocery chain. Consistent orders, prefers bulk shipments."
    },
    {
      id: "RTL-003",
      name: "Artisan Coffee House",
      contactPerson: "Sarah Thompson",
      email: "sarah@artisancoffee.com",
      phone: "+1 (555) 246-8135",
      address: {
        street: "123 Main Street",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      },
      type: "cafe",
      status: "active",
      joinDate: "2024-03-10",
      lastOrder: "2024-08-22",
      totalOrders: 28,
      totalRevenue: 8900.00,
      commission: 18,
      notes: "Boutique cafe chain, focuses on premium chocolate products for their dessert menu."
    },
    {
      id: "RTL-004",
      name: "Online Treats Market",
      contactPerson: "Michael Johnson",
      email: "mike@onlinetreats.com",
      phone: "+1 (555) 369-2580",
      address: {
        street: "987 Digital Lane",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        country: "USA"
      },
      type: "online",
      status: "pending",
      joinDate: "2024-08-15",
      lastOrder: "",
      totalOrders: 0,
      totalRevenue: 0,
      commission: 20,
      notes: "New online retailer application. Pending final contract review."
    },
    {
      id: "RTL-005",
      name: "Fine Dining Restaurant",
      contactPerson: "Chef Antoine Dubois",
      email: "antoine@finedining.com",
      phone: "+1 (555) 147-2583",
      address: {
        street: "654 Culinary Blvd",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      },
      type: "restaurant",
      status: "inactive",
      joinDate: "2023-09-05",
      lastOrder: "2024-03-10",
      totalOrders: 15,
      totalRevenue: 4500.00,
      commission: 25,
      notes: "High-end restaurant. Seasonal orders only. Contract renewal needed."
    }
  ]);

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "grocery", label: "Grocery Store" },
    { value: "specialty", label: "Specialty Shop" },
    { value: "online", label: "Online Retailer" },
    { value: "restaurant", label: "Restaurant" },
    { value: "cafe", label: "Cafe/Coffee Shop" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" }
  ];

  // Filter retailers
  const filteredRetailers = retailers.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || retailer.type === selectedType;
    const matchesStatus = selectedStatus === "all" || retailer.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "grocery":
        return "bg-blue-100 text-blue-800";
      case "specialty":
        return "bg-purple-100 text-purple-800";
      case "online":
        return "bg-green-100 text-green-800";
      case "restaurant":
        return "bg-orange-100 text-orange-800";
      case "cafe":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteRetailer = (retailerId: string) => {
    if (confirm("Are you sure you want to delete this retailer?")) {
      setRetailers(retailers.filter(r => r.id !== retailerId));
    }
  };

  const handleEditRetailer = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setIsEditDialogOpen(true);
  };

  const handleViewRetailer = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setIsViewDialogOpen(true);
  };

  const RetailerForm = ({ retailer, onSave }: { retailer?: Retailer; onSave: (retailer: Retailer) => void }) => {
    const [formData, setFormData] = useState({
      name: retailer?.name || "",
      contactPerson: retailer?.contactPerson || "",
      email: retailer?.email || "",
      phone: retailer?.phone || "",
      street: retailer?.address.street || "",
      city: retailer?.address.city || "",
      state: retailer?.address.state || "",
      zipCode: retailer?.address.zipCode || "",
      country: retailer?.address.country || "USA",
      type: retailer?.type || "grocery",
      status: retailer?.status || "pending",
      commission: retailer?.commission || 15,
      notes: retailer?.notes || ""
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newRetailer: Retailer = {
        id: retailer?.id || "RTL-" + String(Date.now()).slice(-3),
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        type: formData.type as any,
        status: formData.status as any,
        commission: formData.commission,
        notes: formData.notes,
        joinDate: retailer?.joinDate || new Date().toISOString().split('T')[0],
        lastOrder: retailer?.lastOrder || "",
        totalOrders: retailer?.totalOrders || 0,
        totalRevenue: retailer?.totalRevenue || 0
      };
      onSave(newRetailer);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => setFormData({...formData, street: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Business Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as any})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grocery">Grocery Store</SelectItem>
                <SelectItem value="specialty">Specialty Shop</SelectItem>
                <SelectItem value="online">Online Retailer</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="cafe">Cafe/Coffee Shop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as any})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Commission (%)</Label>
            <Input
              id="commission"
              type="number"
              min="0"
              max="100"
              value={formData.commission}
              onChange={(e) => setFormData({...formData, commission: parseFloat(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button type="submit">Save Retailer</Button>
        </DialogFooter>
      </form>
    );
  };

  const RetailerDetails = ({ retailer }: { retailer: Retailer }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Business Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Business Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{retailer.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Contact:</span>
                <span>{retailer.contactPerson}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{retailer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{retailer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div>{retailer.address.street}</div>
                  <div>{retailer.address.city}, {retailer.address.state} {retailer.address.zipCode}</div>
                  <div>{retailer.address.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Business Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge className={getTypeColor(retailer.type)}>
                  {retailer.type}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(retailer.status)}>
                  {retailer.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Join Date:</span>
                <span>{new Date(retailer.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Order:</span>
                <span>
                  {retailer.lastOrder 
                    ? new Date(retailer.lastOrder).toLocaleDateString()
                    : 'No orders yet'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Commission:</span>
                <span>{retailer.commission}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Performance Stats */}
      <div>
        <h3 className="font-medium mb-4">Performance Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="font-medium">{retailer.totalOrders}</div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="font-medium">${retailer.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">
              ${retailer.totalOrders > 0 ? (retailer.totalRevenue / retailer.totalOrders).toFixed(0) : '0'}
            </div>
            <div className="text-xs text-muted-foreground">Avg Order Value</div>
          </div>
        </div>
      </div>

      {retailer.notes && (
        <>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">{retailer.notes}</p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">Retailers Management</h1>
          <p className="text-muted-foreground">
            Manage your retail partners and track their performance.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Retailer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Retailer</DialogTitle>
              <DialogDescription>
                Register a new retail partner for your chocolate business.
              </DialogDescription>
            </DialogHeader>
            <RetailerForm onSave={(retailer) => {
              setRetailers([...retailers, retailer]);
              setIsAddDialogOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retailers.length}</div>
            <p className="text-xs text-muted-foreground">All partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {retailers.filter(r => r.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${retailers.reduce((sum, r) => sum + r.totalRevenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {retailers.length > 0 
                ? (retailers.reduce((sum, r) => sum + r.commission, 0) / retailers.length).toFixed(1)
                : '0'
              }%
            </div>
            <p className="text-xs text-muted-foreground">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Retailers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search retailers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

      {/* Retailers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Retailers ({filteredRetailers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRetailers.map((retailer) => (
              <div key={retailer.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium truncate">{retailer.name}</h3>
                    <Badge className={getStatusColor(retailer.status)}>
                      {retailer.status}
                    </Badge>
                    <Badge className={getTypeColor(retailer.type)} variant="secondary">
                      {retailer.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{retailer.contactPerson}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{retailer.email}</span>
                    <span>{retailer.address.city}, {retailer.address.state}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{retailer.totalOrders} orders</p>
                  <p className="text-sm text-muted-foreground">
                    ${retailer.totalRevenue.toLocaleString()} revenue
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {retailer.commission}% commission
                  </p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewRetailer(retailer)}
                    className="h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditRetailer(retailer)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRetailer(retailer.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Retailer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Retailer Details</DialogTitle>
            <DialogDescription>
              {selectedRetailer ? `${selectedRetailer.name} - ${selectedRetailer.id}` : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedRetailer && <RetailerDetails retailer={selectedRetailer} />}
        </DialogContent>
      </Dialog>

      {/* Edit Retailer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Retailer</DialogTitle>
            <DialogDescription>
              Update the retailer information and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedRetailer && (
            <RetailerForm 
              retailer={selectedRetailer} 
              onSave={(updatedRetailer) => {
                setRetailers(retailers.map(r => r.id === updatedRetailer.id ? updatedRetailer : r));
                setIsEditDialogOpen(false);
                setSelectedRetailer(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
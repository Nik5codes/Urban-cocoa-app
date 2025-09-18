import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  stock: number;
  status: "active" | "inactive" | "draft";
  created: string;
  updated: string;
}

export function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sample products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Dark Chocolate Deluxe Bar",
      description: "Rich 70% cocoa dark chocolate with hints of vanilla and sea salt",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1718011794471-8777e6b5b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc1Njc4ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Best Seller",
      category: "bars",
      stock: 45,
      status: "active",
      created: "2024-01-15",
      updated: "2024-02-20"
    },
    {
      id: "2",
      name: "Milk Chocolate Truffles",
      description: "Creamy milk chocolate truffles filled with smooth ganache",
      price: 24.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1715663760594-5250f3261fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2hvY29sYXRlJTIwdHJ1ZmZsZXxlbnwxfHx8fDE3NTY3ODg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "New",
      category: "truffles",
      stock: 23,
      status: "active",
      created: "2024-02-01",
      updated: "2024-02-15"
    },
    {
      id: "3",
      name: "White Chocolate Bonbons",
      description: "Elegant white chocolate bonbons with exotic fruit fillings",
      price: 29.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1554298128-ea9672f06627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNob2NvbGF0ZSUyMGJvbmJvbnxlbnwxfHx8fDE3NTY3ODg4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Premium",
      category: "bonbons",
      stock: 12,
      status: "active",
      created: "2024-01-20",
      updated: "2024-02-10"
    },
    {
      id: "4",
      name: "Seasonal Holiday Collection",
      description: "Limited edition holiday-themed chocolates",
      price: 35.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1635843945732-08f2cc685f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBhc3NvcnRtZW50JTIwYm94fGVufDF8fHx8MTc1Njc4ODg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "seasonal",
      stock: 0,
      status: "inactive",
      created: "2023-11-15",
      updated: "2024-01-05"
    }
  ]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "bars", label: "Chocolate Bars" },
    { value: "truffles", label: "Truffles" },
    { value: "bonbons", label: "Bonbons" },
    { value: "pralines", label: "Pralines" },
    { value: "seasonal", label: "Seasonal" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "draft", label: "Draft" }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600";
    if (stock < 10) return "text-yellow-600";
    return "text-green-600";
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const ProductForm = ({ product, onSave }: { product?: Product; onSave: (product: Product) => void }) => {
    const [formData, setFormData] = useState({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      originalPrice: product?.originalPrice || 0,
      category: product?.category || "",
      stock: product?.stock || 0,
      status: product?.status || "draft",
      image: product?.image || ""
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newProduct: Product = {
        id: product?.id || Date.now().toString(),
        ...formData,
        rating: product?.rating || 4.5,
        created: product?.created || new Date().toISOString().split('T')[0],
        updated: new Date().toISOString().split('T')[0]
      };
      onSave(newProduct);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price ($)</Label>
            <Input
              id="originalPrice"
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as any})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save Product</Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mb-2">Products Management</h1>
          <p className="text-muted-foreground">
            Manage your chocolate products, inventory, and pricing.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new chocolate product for your inventory.
              </DialogDescription>
            </DialogHeader>
            <ProductForm onSave={(product) => {
              setProducts([...products, product]);
              setIsAddDialogOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {products.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.stock < 10 && p.stock > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Products below 10 units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Products unavailable
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-16 h-16 flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    {product.badge && (
                      <Badge variant="secondary">{product.badge}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>Category: {product.category}</span>
                    <span>Rating: {product.rating}★</span>
                    <span>Updated: {product.updated}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">${product.price}</p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-xs text-muted-foreground line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                  <p className={`text-xs ${getStockColor(product.stock)}`}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProduct(product)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm 
              product={editingProduct} 
              onSave={(updatedProduct) => {
                setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                setIsEditDialogOpen(false);
                setEditingProduct(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
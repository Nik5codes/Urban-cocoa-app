import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { 
  Save, 
  Eye,
  EyeOff,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Mail,
  Globe,
  User,
  Building
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function AdminSettings() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Business Settings
  const [businessSettings, setBusinessSettings] = useState({
    companyName: "Urban Cocoa",
    contactEmail: "info@urbancocoa.com",
    supportEmail: "support@urbancocoa.com",
    phone: "+1 (555) 123-4567",
    address: "123 Chocolate Street, Sweet City, CA 90210",
    website: "https://urbancocoa.com",
    description: "Premium artisan chocolate maker specializing in handcrafted confections using ethically sourced ingredients.",
    taxId: "12-3456789"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newRetailers: false,
    paymentIssues: true,
    systemUpdates: false,
    marketingEmails: true
  });

  // Shipping Settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    standardShippingRate: 9.99,
    expressShippingRate: 19.99,
    internationalShipping: false,
    processingDays: 2,
    shippingRegions: ["USA", "Canada"]
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptPayPal: true,
    acceptBankTransfer: false,
    currency: "USD",
    taxRate: 8.5,
    stripePK: "pk_test_...",
    stripeSecret: "sk_test_..."
  });

  // User Settings
  const [userSettings, setUserSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    sessionTimeout: 60
  });

  const handleSaveBusinessSettings = () => {
    // Here you would typically send the data to your backend
    toast("Business settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast("Notification preferences updated!");
  };

  const handleSaveShipping = () => {
    toast("Shipping settings saved!");
  };

  const handleSavePayment = () => {
    toast("Payment settings updated!");
  };

  const handleSaveUserSettings = () => {
    if (userSettings.newPassword && userSettings.newPassword !== userSettings.confirmPassword) {
      toast("Passwords don't match!");
      return;
    }
    toast("User settings updated!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your business settings, preferences, and configurations.
        </p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Business Settings */}
        <TabsContent value="business">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <CardTitle>Business Information</CardTitle>
                </div>
                <CardDescription>
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={businessSettings.companyName}
                      onChange={(e) => setBusinessSettings({...businessSettings, companyName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={businessSettings.taxId}
                      onChange={(e) => setBusinessSettings({...businessSettings, taxId: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={businessSettings.contactEmail}
                      onChange={(e) => setBusinessSettings({...businessSettings, contactEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={businessSettings.supportEmail}
                      onChange={(e) => setBusinessSettings({...businessSettings, supportEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings({...businessSettings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={businessSettings.website}
                      onChange={(e) => setBusinessSettings({...businessSettings, website: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={businessSettings.address}
                    onChange={(e) => setBusinessSettings({...businessSettings, address: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={businessSettings.description}
                    onChange={(e) => setBusinessSettings({...businessSettings, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button onClick={handleSaveBusinessSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Business Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newOrders">New Orders</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                  </div>
                  <Switch
                    id="newOrders"
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({...notifications, newOrders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowStock">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get alerted when products are running low</p>
                  </div>
                  <Switch
                    id="lowStock"
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newRetailers">New Retailer Applications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new retailer registrations</p>
                  </div>
                  <Switch
                    id="newRetailers"
                    checked={notifications.newRetailers}
                    onCheckedChange={(checked) => setNotifications({...notifications, newRetailers: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentIssues">Payment Issues</Label>
                    <p className="text-sm text-muted-foreground">Get notified of payment failures or disputes</p>
                  </div>
                  <Switch
                    id="paymentIssues"
                    checked={notifications.paymentIssues}
                    onCheckedChange={(checked) => setNotifications({...notifications, paymentIssues: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system maintenance and updates</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive tips and updates about growing your business</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <CardTitle>Shipping Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure shipping rates and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    step="0.01"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processingDays">Processing Days</Label>
                  <Input
                    id="processingDays"
                    type="number"
                    value={shippingSettings.processingDays}
                    onChange={(e) => setShippingSettings({...shippingSettings, processingDays: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="standardShipping">Standard Shipping Rate ($)</Label>
                  <Input
                    id="standardShipping"
                    type="number"
                    step="0.01"
                    value={shippingSettings.standardShippingRate}
                    onChange={(e) => setShippingSettings({...shippingSettings, standardShippingRate: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expressShipping">Express Shipping Rate ($)</Label>
                  <Input
                    id="expressShipping"
                    type="number"
                    step="0.01"
                    value={shippingSettings.expressShippingRate}
                    onChange={(e) => setShippingSettings({...shippingSettings, expressShippingRate: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="internationalShipping">International Shipping</Label>
                  <p className="text-sm text-muted-foreground">Enable shipping to international destinations</p>
                </div>
                <Switch
                  id="internationalShipping"
                  checked={shippingSettings.internationalShipping}
                  onCheckedChange={(checked) => setShippingSettings({...shippingSettings, internationalShipping: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label>Shipping Regions</Label>
                <div className="flex flex-wrap gap-2">
                  {shippingSettings.shippingRegions.map((region) => (
                    <Badge key={region} variant="secondary">
                      {region}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently shipping to selected regions. Contact support to add more regions.
                </p>
              </div>

              <Button onClick={handleSaveShipping} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Shipping Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle>Payment Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure payment methods and tax settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptCreditCards">Credit Cards (Stripe)</Label>
                    <p className="text-sm text-muted-foreground">Accept Visa, MasterCard, and American Express</p>
                  </div>
                  <Switch
                    id="acceptCreditCards"
                    checked={paymentSettings.acceptCreditCards}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, acceptCreditCards: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptPayPal">PayPal</Label>
                    <p className="text-sm text-muted-foreground">Accept payments through PayPal</p>
                  </div>
                  <Switch
                    id="acceptPayPal"
                    checked={paymentSettings.acceptPayPal}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, acceptPayPal: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="acceptBankTransfer">Bank Transfer</Label>
                    <p className="text-sm text-muted-foreground">Accept direct bank transfers</p>
                  </div>
                  <Switch
                    id="acceptBankTransfer"
                    checked={paymentSettings.acceptBankTransfer}
                    onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, acceptBankTransfer: checked})}
                  />
                </div>
              </div>

              {paymentSettings.acceptCreditCards && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Stripe Configuration</h3>
                    <div className="space-y-2">
                      <Label htmlFor="stripePK">Stripe Publishable Key</Label>
                      <Input
                        id="stripePK"
                        value={paymentSettings.stripePK}
                        onChange={(e) => setPaymentSettings({...paymentSettings, stripePK: e.target.value})}
                        placeholder="pk_live_..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripeSecret">Stripe Secret Key</Label>
                      <div className="relative">
                        <Input
                          id="stripeSecret"
                          type={showPassword ? "text" : "password"}
                          value={paymentSettings.stripeSecret}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecret: e.target.value})}
                          placeholder="sk_live_..."
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button onClick={handleSavePayment} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Account Security</CardTitle>
                </div>
                <CardDescription>
                  Update your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={userSettings.currentPassword}
                    onChange={(e) => setUserSettings({...userSettings, currentPassword: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={userSettings.newPassword}
                      onChange={(e) => setUserSettings({...userSettings, newPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={userSettings.confirmPassword}
                      onChange={(e) => setUserSettings({...userSettings, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={userSettings.twoFactorAuth}
                    onCheckedChange={(checked) => setUserSettings({...userSettings, twoFactorAuth: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select 
                    value={userSettings.sessionTimeout.toString()} 
                    onValueChange={(value) => setUserSettings({...userSettings, sessionTimeout: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveUserSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Danger Zone</CardTitle>
                </div>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-destructive rounded-lg p-4">
                  <h3 className="font-medium text-destructive mb-2">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" disabled>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
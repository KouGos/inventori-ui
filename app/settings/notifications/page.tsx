import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export default function NotificationsPage() {
  return (
    <PageLayout
      title="Notification Settings"
      description="Manage your notification preferences"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      }
    >
      <Tabs defaultValue="email">
        <TabsList>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="app">In-App Notifications</TabsTrigger>
          <TabsTrigger value="sms">SMS Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Preferences</CardTitle>
              <CardDescription>Configure which email notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Inventory Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="low-stock-email" className="flex-1">
                      <div>Low Stock Alerts</div>
                      <div className="text-sm text-gray-500">Receive notifications when items are running low</div>
                    </Label>
                    <Switch id="low-stock-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="expiry-email" className="flex-1">
                      <div>Expiry Alerts</div>
                      <div className="text-sm text-gray-500">Receive notifications for items nearing expiry</div>
                    </Label>
                    <Switch id="expiry-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="stockout-email" className="flex-1">
                      <div>Stockout Alerts</div>
                      <div className="text-sm text-gray-500">Receive notifications when items are out of stock</div>
                    </Label>
                    <Switch id="stockout-email" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Order Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-status-email" className="flex-1">
                      <div>Order Status Updates</div>
                      <div className="text-sm text-gray-500">Receive notifications when order status changes</div>
                    </Label>
                    <Switch id="order-status-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="delivery-email" className="flex-1">
                      <div>Delivery Notifications</div>
                      <div className="text-sm text-gray-500">
                        Receive notifications for upcoming and completed deliveries
                      </div>
                    </Label>
                    <Switch id="delivery-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-issue-email" className="flex-1">
                      <div>Order Issue Alerts</div>
                      <div className="text-sm text-gray-500">Receive notifications for problems with orders</div>
                    </Label>
                    <Switch id="order-issue-email" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-updates-email" className="flex-1">
                      <div>System Updates</div>
                      <div className="text-sm text-gray-500">
                        Receive notifications about system updates and maintenance
                      </div>
                    </Label>
                    <Switch id="system-updates-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-email" className="flex-1">
                      <div>Security Alerts</div>
                      <div className="text-sm text-gray-500">Receive notifications about security-related events</div>
                    </Label>
                    <Switch id="security-email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="report-email" className="flex-1">
                      <div>Report Generation</div>
                      <div className="text-sm text-gray-500">Receive notifications when reports are generated</div>
                    </Label>
                    <Switch id="report-email" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="app" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notification Preferences</CardTitle>
              <CardDescription>Configure which in-app notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="activity-app" className="flex-1">
                      <div>Activity Feed</div>
                      <div className="text-sm text-gray-500">Show notifications in your activity feed</div>
                    </Label>
                    <Switch id="activity-app" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="alerts-app" className="flex-1">
                      <div>Real-time Alerts</div>
                      <div className="text-sm text-gray-500">Show pop-up notifications for important alerts</div>
                    </Label>
                    <Switch id="alerts-app" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-app" className="flex-1">
                      <div>Notification Sounds</div>
                      <div className="text-sm text-gray-500">Play sounds for notifications</div>
                    </Label>
                    <Switch id="sound-app" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notification Preferences</CardTitle>
              <CardDescription>Configure which SMS notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Critical Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="critical-stock-sms" className="flex-1">
                      <div>Critical Stock Alerts</div>
                      <div className="text-sm text-gray-500">Receive SMS for critical stock issues</div>
                    </Label>
                    <Switch id="critical-stock-sms" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="urgent-delivery-sms" className="flex-1">
                      <div>Urgent Delivery Updates</div>
                      <div className="text-sm text-gray-500">Receive SMS for urgent delivery updates</div>
                    </Label>
                    <Switch id="urgent-delivery-sms" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-breach-sms" className="flex-1">
                      <div>Security Breach Alerts</div>
                      <div className="text-sm text-gray-500">Receive SMS for security breaches</div>
                    </Label>
                    <Switch id="security-breach-sms" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

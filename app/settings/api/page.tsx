import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Plus } from "lucide-react"

export default function ApiIntegrationsPage() {
  return (
    <PageLayout
      title="API & Integrations"
      description="Manage API keys and third-party integrations"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> New Integration
        </Button>
      }
    >
      <Tabs defaultValue="api-keys">
        <TabsList>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for accessing the Inventori API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="api-key">Production API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      value="sk_prod_2023_xxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono text-sm rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">Created on April 10, 2024</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="test-api-key">Test API Key</Label>
                  <div className="flex">
                    <Input
                      id="test-api-key"
                      value="sk_test_2023_xxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono text-sm rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">Created on April 10, 2024</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="flex gap-2">
                    <RefreshCw className="h-4 w-4" /> Rotate API Keys
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Connect Inventori with other services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">QuickBooks</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <CardDescription>Financial management integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">Connected on April 5, 2024</div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Salesforce</CardTitle>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                        Not Connected
                      </Badge>
                    </div>
                    <CardDescription>CRM integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="mt-4 bg-brand-600 hover:bg-brand-700 text-white">
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Slack</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <CardDescription>Notifications integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">Connected on March 15, 2024</div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Zapier</CardTitle>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                        Not Connected
                      </Badge>
                    </div>
                    <CardDescription>Workflow automation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="mt-4 bg-brand-600 hover:bg-brand-700 text-white">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configure webhooks to receive real-time updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Inventory Updates</h3>
                    <p className="text-sm text-gray-500">https://example.com/webhooks/inventory</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">Order Status Changes</h3>
                    <p className="text-sm text-gray-500">https://example.com/webhooks/orders</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>

                <div className="flex justify-between items-center pb-4">
                  <div>
                    <h3 className="font-medium">Supplier Updates</h3>
                    <p className="text-sm text-gray-500">https://example.com/webhooks/suppliers</p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Inactive
                  </Badge>
                </div>

                <Button className="mt-4 bg-brand-600 hover:bg-brand-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

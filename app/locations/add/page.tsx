import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, MapPin } from "lucide-react"
import Link from "next/link"

export default function AddLocationPage() {
  return (
    <PageLayout
      title={
        <div className="flex items-center">
          <Link href="/locations/warehouses" className="mr-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          Add New Location
        </div>
      }
      description="Create a new storage or warehouse location"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Save className="mr-2 h-4 w-4" /> Save Location
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
            <CardDescription>Enter the basic details about the location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-name">Location Name</Label>
                <Input id="location-name" placeholder="Enter location name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-code">Location Code</Label>
                <Input id="location-code" placeholder="e.g. WH-001" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Brief description of the location" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-type">Location Type</Label>
                <Select>
                  <SelectTrigger id="location-type">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="storage-room">Storage Room</SelectItem>
                    <SelectItem value="cold-storage">Cold Storage</SelectItem>
                    <SelectItem value="secure-storage">Secure Storage</SelectItem>
                    <SelectItem value="offsite">Offsite Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-location">Parent Location (Optional)</Label>
                <Select>
                  <SelectTrigger id="parent-location">
                    <SelectValue placeholder="Select parent location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="east">East Wing Storage</SelectItem>
                    <SelectItem value="west">West Wing Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Physical address for this location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address-line1">Address Line 1</Label>
                <Input id="address-line1" placeholder="Street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-line2">Address Line 2</Label>
                <Input id="address-line2" placeholder="Building, Suite, Floor (optional)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="State" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="ZIP code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="flex gap-2">
                  <MapPin className="h-4 w-4" /> Set Map Location
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Information</CardTitle>
              <CardDescription>Details about storage capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="total-capacity">Total Capacity (sq ft)</Label>
                <Input id="total-capacity" type="number" placeholder="Enter total capacity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature-range">Temperature Range (°C)</Label>
                <div className="flex gap-4">
                  <Input id="min-temp" type="number" placeholder="Min" />
                  <Input id="max-temp" type="number" placeholder="Max" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity-range">Humidity Range (%)</Label>
                <div className="flex gap-4">
                  <Input id="min-humidity" type="number" placeholder="Min" />
                  <Input id="max-humidity" type="number" placeholder="Max" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Storage Features</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="refrigeration" />
                    <Label htmlFor="refrigeration">Refrigeration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="freezer" />
                    <Label htmlFor="freezer">Freezer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="secure" />
                    <Label htmlFor="secure">Secure Access</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hazardous" />
                    <Label htmlFor="hazardous">Hazardous Materials</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temperature-monitoring" />
                    <Label htmlFor="temperature-monitoring">Temperature Monitoring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="humidity-monitoring" />
                    <Label htmlFor="humidity-monitoring">Humidity Monitoring</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Contact details for this location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager-name">Location Manager</Label>
                <Input id="manager-name" placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating-hours">Operating Hours</Label>
                <Input id="operating-hours" placeholder="e.g. Mon-Fri 8am-5pm" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Save className="mr-2 h-4 w-4" /> Save Location
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}

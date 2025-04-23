import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Upload, RefreshCw, Save } from "lucide-react"

export default function BackupSyncPage() {
  return (
    <PageLayout
      title="Backup & Sync"
      description="Manage data backup and synchronization settings"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Automatic Backups</CardTitle>
            <CardDescription>Configure automatic backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="flex-1">
                <div>Enable Automatic Backups</div>
                <div className="text-sm text-gray-500">Automatically backup your data</div>
              </Label>
              <Switch id="auto-backup" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-retention">Backup Retention</Label>
              <Select defaultValue="30">
                <SelectTrigger id="backup-retention">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-storage">Backup Storage</Label>
              <Select defaultValue="cloud">
                <SelectTrigger id="backup-storage">
                  <SelectValue placeholder="Select storage location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Storage</SelectItem>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="both">Both Local and Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Backup & Restore</CardTitle>
            <CardDescription>Create and restore backups manually</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Create Backup</h3>
              <p className="text-sm text-gray-500">Create a manual backup of your data</p>
              <Button className="mt-2 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                <Download className="mr-2 h-4 w-4" /> Create Backup
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-medium">Restore from Backup</h3>
              <p className="text-sm text-gray-500">Restore your data from a previous backup</p>
              <Button variant="outline" className="mt-2">
                <Upload className="mr-2 h-4 w-4" /> Restore Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>View and manage your backup history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="font-medium">Daily Backup</h3>
                  <p className="text-sm text-gray-500">April 10, 2024 - 02:00 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="font-medium">Daily Backup</h3>
                  <p className="text-sm text-gray-500">April 9, 2024 - 02:00 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="font-medium">Manual Backup</h3>
                  <p className="text-sm text-gray-500">April 8, 2024 - 11:45 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Daily Backup</h3>
                  <p className="text-sm text-gray-500">April 8, 2024 - 02:00 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Data Synchronization</CardTitle>
            <CardDescription>Configure data synchronization between devices and locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sync-enabled" className="flex-1">
                <div>Enable Data Synchronization</div>
                <div className="text-sm text-gray-500">Sync data across multiple devices and locations</div>
              </Label>
              <Switch id="sync-enabled" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select defaultValue="realtime">
                <SelectTrigger id="sync-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="flex gap-2">
                <RefreshCw className="h-4 w-4" /> Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

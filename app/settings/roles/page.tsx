import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash } from "lucide-react"

export default function RolesPermissionsPage() {
  // Sample roles data
  const roles = [
    {
      id: "ROLE001",
      name: "Administrator",
      description: "Full system access with all permissions",
      users: 3,
      permissions: "Full Access",
      isDefault: true,
    },
    {
      id: "ROLE002",
      name: "Inventory Manager",
      description: "Manage inventory, products, and stock levels",
      users: 5,
      permissions: "Products, Inventory, Orders",
      isDefault: false,
    },
    {
      id: "ROLE003",
      name: "Purchasing Agent",
      description: "Create and manage purchase orders",
      users: 8,
      permissions: "Orders, Suppliers",
      isDefault: false,
    },
    {
      id: "ROLE004",
      name: "Warehouse Staff",
      description: "Manage physical inventory and transfers",
      users: 12,
      permissions: "Inventory, Transfers",
      isDefault: false,
    },
    {
      id: "ROLE005",
      name: "Finance",
      description: "Access to financial data and reports",
      users: 4,
      permissions: "Finances, Analytics",
      isDefault: false,
    },
    {
      id: "ROLE006",
      name: "Read Only",
      description: "View-only access to system data",
      users: 6,
      permissions: "View Only",
      isDefault: false,
    },
  ]

  // Sample permissions data
  const permissionGroups = [
    {
      name: "Inventory Management",
      permissions: [
        {
          name: "View Inventory",
          admin: true,
          manager: true,
          purchasing: true,
          warehouse: true,
          finance: true,
          readonly: true,
        },
        {
          name: "Add Products",
          admin: true,
          manager: true,
          purchasing: false,
          warehouse: false,
          finance: false,
          readonly: false,
        },
        {
          name: "Edit Products",
          admin: true,
          manager: true,
          purchasing: false,
          warehouse: true,
          finance: false,
          readonly: false,
        },
        {
          name: "Delete Products",
          admin: true,
          manager: true,
          purchasing: false,
          warehouse: false,
          finance: false,
          readonly: false,
        },
        {
          name: "Manage Stock Levels",
          admin: true,
          manager: true,
          purchasing: false,
          warehouse: true,
          finance: false,
          readonly: false,
        },
      ],
    },
    {
      name: "Order Management",
      permissions: [
        {
          name: "View Orders",
          admin: true,
          manager: true,
          purchasing: true,
          warehouse: true,
          finance: true,
          readonly: true,
        },
        {
          name: "Create Orders",
          admin: true,
          manager: true,
          purchasing: true,
          warehouse: false,
          finance: false,
          readonly: false,
        },
        {
          name: "Approve Orders",
          admin: true,
          manager: true,
          purchasing: false,
          warehouse: false,
          finance: true,
          readonly: false,
        },
        {
          name: "Cancel Orders",
          admin: true,
          manager: true,
          purchasing: true,
          warehouse: false,
          finance: false,
          readonly: false,
        },
      ],
    },
  ]

  return (
    <PageLayout
      title="Roles & Permissions"
      description="Manage user roles and access permissions"
      headerAction={
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="mr-2 h-4 w-4" /> Create Role
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Define roles and assign permissions to users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.users}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100">
                        {role.permissions}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch checked={role.isDefault} disabled={role.isDefault} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" disabled={role.isDefault}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Configure access permissions for each role</CardDescription>
          </CardHeader>
          <CardContent>
            {permissionGroups.map((group) => (
              <div key={group.name} className="mb-6">
                <h3 className="text-lg font-medium mb-4">{group.name}</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Permission</TableHead>
                        <TableHead className="text-center">Administrator</TableHead>
                        <TableHead className="text-center">Inventory Manager</TableHead>
                        <TableHead className="text-center">Purchasing Agent</TableHead>
                        <TableHead className="text-center">Warehouse Staff</TableHead>
                        <TableHead className="text-center">Finance</TableHead>
                        <TableHead className="text-center">Read Only</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.permissions.map((permission) => (
                        <TableRow key={permission.name}>
                          <TableCell>{permission.name}</TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.admin} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.manager} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.purchasing} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.warehouse} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.finance} />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch checked={permission.readonly} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}

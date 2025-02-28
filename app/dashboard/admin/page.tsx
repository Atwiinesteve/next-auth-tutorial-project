import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Settings, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to User Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor your registered users with ease.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                No change from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all registered users in your system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Access the complete list of users, edit their details, and
                manage their permissions.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/admin/users" passHref>
                <Button>View All Users</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks for user management.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start" asChild>
                <Link
                  href={"/dashboard/admin/users/create-new"}
                  className={`!justify-start ${buttonVariants({
                    variant: "outline",
                  })}`}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add New User
                </Link>
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

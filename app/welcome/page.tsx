import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { USER_ROLES } from "@/lib/constants";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const userRole = await auth();

  if (userRole?.user?.role !== USER_ROLES.ADMIN)
    redirect("/dashboard/admin");

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header/Navigation
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">User Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container mx-auto flex-1 p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>
                Overview of your recent activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Last login</span>
                  <span className="text-sm text-muted-foreground">
                    Today, 9:42 AM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active sessions</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Account status</span>
                  <span className="text-sm text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest platform changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-medium">New features added</p>
                  <p className="text-sm text-muted-foreground">
                    We've added new customization options
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-4 py-2">
                  <p className="font-medium">Maintenance complete</p>
                  <p className="text-sm text-muted-foreground">
                    Platform performance improvements
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View all updates
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Things you can do right now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-between" variant="outline">
                Update profile
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Manage preferences
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                View resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Content */}
        <Card className="mt-6">
          <div className="md:grid md:grid-cols-5">
            <div className="col-span-3 p-6">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                Featured
              </div>
              <h3 className="mt-2 text-2xl font-bold">
                Getting the most from your account
              </h3>
              <p className="mt-2 text-muted-foreground">
                Discover all the features available to you and how to use them
                effectively. Our platform provides tools to help you succeed.
              </p>
              <Button className="mt-4">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-64 col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Person using laptop"
                fill
                className="object-cover rounded-r-lg"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Your Company. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

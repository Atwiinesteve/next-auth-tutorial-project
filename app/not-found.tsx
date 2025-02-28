"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tighter text-primary">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Page not found
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved. Check
            the URL or try one of the options below.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 min-[400px]:gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => redirect("/")}
            className="inline-flex items-center"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <div className="mt-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>
        </div>
      </div>
    </div>
  );
}

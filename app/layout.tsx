import NavigationBar from "@/components/navigation-bar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body
          className={`${poppins.className} antialiased`}
          suppressHydrationWarning
        >
          <div className="min-h-screen bg-background flex flex-col">
            <NavigationBar />
            {children}
            <Toaster richColors={true} />
          </div>
        </body>
      </Providers>
    </html>
  );
}

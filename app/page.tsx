import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

export default function App() {
	return (
		<>
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
					Authentication made
					<span className="text-primary"> simple</span>
				</h1>
				<p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
					Secure, scalable authentication for modern applications. Get started
					in minutes, scale to millions.
				</p>
				<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button size="lg" className="w-full sm:w-auto">
						Start for free
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
					<Button size="lg" variant="outline" className="w-full sm:w-auto">
						<Github className="mr-2 h-4 w-4" />
						View on GitHub
					</Button>
				</div>
			</section>
		</>
	);
}

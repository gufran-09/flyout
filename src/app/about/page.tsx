import { Layout } from "@/components/layout/Layout";
import { Check, Shield, Users, Trophy } from "lucide-react";

export default function AboutUs() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative bg-primary/5 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl">
                        About Flyout Tours
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-muted-foreground">
                        Your premier partner for unforgettable experiences in the UAE.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Mission</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Creating Memories That Last a Lifetime
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
                            We are dedicated to providing the best travel experiences in Dubai and Abu Dhabi, ensuring every journey is safe, exciting, and memorable.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <Shield className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-foreground">Trusted & Secure</p>
                                <div className="ml-16 mt-2 text-base text-muted-foreground">
                                    Your safety and security are our top priorities. We partner with licensed and reputable operators.
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <Users className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-foreground">Customer First</p>
                                <div className="ml-16 mt-2 text-base text-muted-foreground">
                                    Our dedicated support team is available 24/7 to assist you with any queries or concerns.
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <Trophy className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-foreground">Premium Experiences</p>
                                <div className="ml-16 mt-2 text-base text-muted-foreground">
                                    We curate only the best tours and activities to ensure high-quality experiences.
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <Check className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-foreground">Best Price Guarantee</p>
                                <div className="ml-16 mt-2 text-base text-muted-foreground">
                                    We offer competitive prices without compromising on quality or service.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Message sent successfully!");
        }, 1500);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Layout>
            <div className="bg-background min-h-screen">
                <div className="bg-primary/5 py-12 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Contact Us</h1>
                    <p className="mt-4 text-xl text-muted-foreground">We'd love to hear from you. Get in touch with us.</p>
                </div>

                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                            <div className="space-y-6">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Sharjah+Media+City,+Sharjah+515000+United+Arab+Emirates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start group hover:text-primary transition-colors cursor-pointer"
                                >
                                    <MapPin className="h-6 w-6 text-primary mt-1 group-hover:text-primary/80" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary">Office Address</h3>
                                        <p className="mt-1 text-muted-foreground group-hover:text-primary/80">
                                            Sharjah Media City, Sharjah 515000<br />
                                            United Arab Emirates
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/971544661317"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start group hover:text-primary transition-colors cursor-pointer"
                                >
                                    <Phone className="h-6 w-6 text-primary mt-1 group-hover:text-primary/80" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary">Phone</h3>
                                        <p className="mt-1 text-muted-foreground group-hover:text-primary/80">+971 54 466 1317</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@flyouttours.com"
                                    className="flex items-start group hover:text-primary transition-colors cursor-pointer"
                                >
                                    <Mail className="h-6 w-6 text-primary mt-1 group-hover:text-primary/80" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary">Email</h3>
                                        <p className="mt-1 text-muted-foreground group-hover:text-primary/80">info@flyouttours.com</p>
                                    </div>
                                </a>
                                <div className="flex items-start">
                                    <Clock className="h-6 w-6 text-primary mt-1" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-foreground">Working Hours</h3>
                                        <p className="mt-1 text-muted-foreground">
                                            Monday - Sunday: 9:00 AM - 9:00 PM<br />
                                            Support: 24/7
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form or Success Message */}
                        <div className="bg-card shadow-lg rounded-lg p-8 border">
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center text-center space-y-4 py-8 pointer-events-auto">
                                    <CheckCircle className="h-16 w-16 text-primary mb-4" />
                                    <h2 className="text-2xl font-bold text-foreground">Thank you, {formData.name}!</h2>
                                    <p className="text-muted-foreground">
                                        We have received your message and will get back to you shortly at <span className="font-semibold text-foreground">{formData.email}</span>.
                                    </p>
                                    <Button onClick={handleReset} variant="outline" className="mt-6">
                                        Send another message
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                                Name
                                            </label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your Name"
                                                className="mt-1"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="mt-1"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-foreground">
                                                Message
                                            </label>
                                            <Textarea
                                                id="message"
                                                placeholder="How can we help you?"
                                                className="mt-1 h-32"
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

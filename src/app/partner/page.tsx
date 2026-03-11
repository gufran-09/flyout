import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Shield,
    Globe,
    Zap,
    BarChart,
    Users,
    CheckCircle2,
    Building2,
    Ship,
    Tent,
    Ticket,
    ArrowRight,
} from "lucide-react";

export default function Partner() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        website: "",
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from('partners_applications')
                .insert([
                    {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        company_name: formData.companyName,
                        website: formData.website,
                        description: formData.description,
                        status: 'pending',
                        source: '/partner'
                    }
                ]);

            if (error) throw error;

            toast({
                title: "Application Received",
                description: "Thank you for applying. We'll be in touch within 48 hours.",
                className: "bg-green-50 border-green-200 text-green-900",
            });

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                companyName: "",
                website: "",
                description: ""
            });

        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "Submission Error",
                description: error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#020617]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1559586616-361e18714958?w=1600&q=80"
                        alt="Luxury Yacht in Dubai"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/60 to-[#020617]" />
                </div>

                {/* Content */}
                <div className="section-container relative z-10 text-center max-w-4xl px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-[#BE9B57] animate-pulse" />
                        <span className="text-sm font-medium text-[#BE9B57] tracking-wide uppercase">
                            For Premium Tour Operators
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight animate-slide-up">
                        Partner with the <br />
                        <span className="text-[#BE9B57] italic">finest curation</span> of UAE experiences.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up stagger-1">
                        Join Flyout’s exclusive network of verified partners. Connect with high-value travelers seeking exceptional journeys, from private yacht charters to bespoke desert escapes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
                        <Button
                            size="lg"
                            className="bg-[#BE9B57] text-[#020617] hover:bg-white text-base font-bold px-8 h-14 rounded-full"
                            onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Apply to Join
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-transparent border-white/30 text-white hover:bg-white hover:text-black text-base h-14 rounded-full px-8 backdrop-blur-sm transition-all duration-300"
                            onClick={() => document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Explore Benefits
                        </Button>
                    </div>
                </div>
            </section>

            {/* 2. WHY PARTNER SECTION */}
            <section className="py-24 bg-white relative">
                <div className="section-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-display text-[#020617] mb-4">
                            Why Partner with Flyout?
                        </h2>
                        <p className="text-slate-600 font-light text-lg">
                            We don't just list tours; we elevate brands. Our platform is designed for operators who prioritize quality, safety, and guest satisfaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-[#020617] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Globe className="text-[#BE9B57] w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-display text-[#020617] mb-3">Global Reach</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Access a curated audience of international travelers from key markets including Europe, USA, and CIS who value premium service.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-[#020617] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="text-[#BE9B57] w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-display text-[#020617] mb-3">Brand Integrity</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Position your experiences alongside the UAE’s most reputable operators. We maintain strict quality standards to ensure trust.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-[#020617] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="text-[#BE9B57] w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-display text-[#020617] mb-3">Seamless Tech</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Our advanced booking engine handles availability, payments, and confirmations instantly, letting you focus on operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHO WE LOOK FOR - CATEGORIES */}
            <section id="ecosystem" className="py-24 bg-[#020617] relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BE9B57]/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="section-container relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-[#BE9B57] font-medium tracking-wider uppercase text-sm mb-2 block">
                                Our Ecosystem
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display text-white">
                                Who we look for.
                            </h2>
                        </div>
                        <p className="text-slate-400 font-light max-w-md text-right md:text-left">
                            We partner with direct operators and asset owners across key verticals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Ship, title: "Yacht Charters", desc: "Private luxury yachts & boats" },
                            { icon: Tent, title: "Desert Safaris", desc: "Premium & heritage camps" },
                            { icon: Ticket, title: "Attractions", desc: "Theme parks & landmarks" },
                            { icon: Building2, title: "Hospitality", desc: "Resorts & staycations" },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <div className="mb-6 opacity-60 group-hover:opacity-100 group-hover:text-[#BE9B57] transition-colors">
                                    <item.icon size={40} />
                                </div>
                                <h4 className="text-xl font-display text-white mb-2">{item.title}</h4>
                                <p className="text-slate-400 text-sm font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TOOLS & INFRASTRUCTURE */}
            <section className="py-24 bg-slate-50">
                <div className="section-container">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Content */}
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-display text-[#020617] leading-tight">
                                Built for <span className="text-[#BE9B57]/80 italic">growth</span>.
                                <br />
                                Powered by data.
                            </h2>
                            <p className="text-slate-600 text-lg font-light leading-relaxed">
                                Our supplier dashboard gives you full control. Manage inventory, track bookings in real-time, and access detailed analytics to optimize your performance on Flyout.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { title: "Real-time Availability", desc: "Sync your calendars seamlessly" },
                                    { title: "Automated Payouts", desc: "Weekly transfers to your account" },
                                    { title: "Dedicated Account Manager", desc: "Support for content & pricing" },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-[#BE9B57]/10 p-1.5 rounded-full">
                                            <CheckCircle2 className="w-4 h-4 text-[#BE9B57]" />
                                        </div>
                                        <div>
                                            <h4 className="text-[#020617] font-medium">{feature.title}</h4>
                                            <p className="text-slate-500 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Visual - Abstract Dashboard */}
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-[#BE9B57]/20 blur-[80px] rounded-full opacity-50" />
                            <div className="relative bg-[#020617] border border-slate-800 rounded-2xl p-6 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-700 ease-out">
                                {/* Mockup Header */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">dashboard.flyout.com</span>
                                </div>

                                {/* Mockup Body */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <span className="text-xs text-slate-400 uppercase">Total Revenue</span>
                                            <div className="text-2xl text-white font-display mt-1">AED 142,500</div>
                                            <span className="text-xs text-green-400 flex items-center gap-1 mt-2">
                                                <BarChart size={12} /> +12.5% vs last month
                                            </span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <span className="text-xs text-slate-400 uppercase">Bookings</span>
                                            <div className="text-2xl text-white font-display mt-1">384</div>
                                            <span className="text-xs text-green-400 flex items-center gap-1 mt-2">
                                                <Users size={12} /> +8.2% vs last month
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-32 rounded-xl bg-white/5 border border-white/10 flex items-end justify-between p-4 gap-2">
                                        {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="w-full bg-[#BE9B57]/20 rounded-t-sm hover:bg-[#BE9B57]/40 transition-colors" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. APPLICATION FORM */}
            <section id="apply-form" className="py-24 bg-white">
                <div className="section-container max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">

                        {/* Sidebar info */}
                        <div className="bg-[#020617] text-white p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE9B57] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20"></div>

                            <div>
                                <h3 className="text-2xl font-display mb-4">Start your journey</h3>
                                <p className="text-slate-300 font-light text-sm mb-8">
                                    Fill out the form to become a Flyout partner. Our team reviews all applications within 48 hours.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#BE9B57]">
                                            1
                                        </div>
                                        <span>Submit Application</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#BE9B57]">
                                            2
                                        </div>
                                        <span>Review & Verification</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#BE9B57]">
                                            3
                                        </div>
                                        <span>Onboarding & Live</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Contact Support</p>
                                <a href="mailto:info@flyouttours.com" className="text-[#BE9B57] hover:underline">info@flyouttours.com</a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-10 md:w-3/5">
                            <h3 className="text-2xl font-display text-[#020617] mb-6">Company Details</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">First Name</label>
                                        <Input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className="h-11 bg-slate-50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="h-11 bg-slate-50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Business Email</label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@company.com"
                                        className="h-11 bg-slate-50"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Company Name</label>
                                    <Input
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Tour Company LLC"
                                        className="h-11 bg-slate-50"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Website URL</label>
                                    <Input
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://"
                                        className="h-11 bg-slate-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Type of Experiences</label>
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Please provide a brief overview of the experiences, activities, or services your company offers..."
                                        className="min-h-[100px] bg-slate-50 resize-none"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#020617] hover:bg-[#020617]/90 text-white font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>Submitting...</>
                                    ) : (
                                        <>Submit Application <ArrowRight className="ml-2 w-4 h-4" /></>
                                    )}
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
}

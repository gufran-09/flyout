import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaApplePay, FaGooglePay } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white pt-24 pb-8 font-sans border-t border-white/5 relative overflow-hidden">

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-flyout-gold/5 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1a2333]/50 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. BRAND HERO ZONE */}
      <div className="section-container relative z-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left: Brand Narrative */}
          <div className="space-y-8">
            <Link to="/" className="block">
              <img src="/logo-footer.png" alt="Flyout Tours" className="h-[72px] w-auto object-contain -ml-2" />
            </Link>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-light text-white leading-tight">
                Flyout curates the <span className="text-flyout-gold">finest experiences</span> across the Emirates.
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-md">
                From private yacht charters to exclusive desert escapes, we design journeys that redefine luxury travel in the UAE.
              </p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-flyout-gold/10 to-transparent border-l-2 border-flyout-gold rounded-r-lg">
                <Shield size={18} className="text-flyout-gold" />
                <span className="text-xs font-semibold tracking-wider text-flyout-gold uppercase">Licensed UAE Travel Partner</span>
              </div>

              {/* Socials Row */}
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/flyout_tours/" },
                  { icon: Facebook, href: "https://www.facebook.com/flyouttours" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/flyout-tours-llc/posts/?feedView=all" },
                  { icon: Youtube, href: "https://youtube.com" }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-flyout-gold hover:text-black hover:border-flyout-gold transition-all duration-300">
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Premium Concierge Card */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Phone size={80} className="text-flyout-gold rotate-12" />
            </div>

            <h3 className="text-flyout-gold font-display text-xl mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-flyout-gold"></span>
              Concierge & Support
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 relative z-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Headquarters</p>
                <a
                  href="https://www.google.com/maps/place/FLYOUT+TOURS+LLC/@25.3461555,55.4210932,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f590c2706c7e1:0x7eec8aa0c0001d83!8m2!3d25.3461555!4d55.4210932!16s%2Fg%2F11kc2lb57r?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group/link"
                >
                  <MapPin size={18} className="text-flyout-gold shrink-0 mt-0.5 group-hover/link:text-white transition-colors" />
                  <span className="text-slate-300 text-sm group-hover/link:text-white transition-colors">Sharjah Media City,<br />United Arab Emirates</span>
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Concierge Line</p>
                <a
                  href="https://wa.me/971544661317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group/link"
                >
                  <Phone size={18} className="text-flyout-gold shrink-0 group-hover/link:text-white transition-colors" />
                  <span className="text-white text-lg font-display tracking-wide group-hover/link:text-flyout-gold transition-colors">+971 54 466 1317</span>
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Email Us</p>
                <a
                  href="mailto:info@flyouttours.com"
                  className="flex items-center gap-3 group/link"
                >
                  <Mail size={18} className="text-flyout-gold shrink-0 group-hover/link:text-white transition-colors" />
                  <span className="text-slate-300 text-sm group-hover/link:text-white transition-colors cursor-pointer">info@flyouttours.com</span>
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-medium">Support</p>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-flyout-gold shrink-0" />
                  <span className="text-slate-300 text-sm">24/7 Dedicated Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONVERSION STRIP */}
      <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-12 mb-20">
        <div className="section-container px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl font-display text-white mb-2">Get exclusive UAE travel deals</h3>
              <p className="text-slate-400 font-light">Join our concierge list for private offers and curated experiences.</p>
            </div>

            <div className="w-full max-w-md bg-white/5 p-1.5 rounded-full border border-white/10 flex focus-within:border-flyout-gold/50 transition-colors shadow-2xl shadow-black/20">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border-none outline-none text-white px-6 text-sm w-full placeholder:text-slate-600 font-light"
              />
              <button className="bg-flyout-gold text-black px-8 py-3 rounded-full text-sm font-bold tracking-wide 
hover:bg-white transition-colors flex items-center gap-2 
shadow-lg shadow-flyout-gold/20 hover:shadow-flyout-gold/40 whitespace-nowrap">
                Join List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION GRID */}
      <div className="section-container px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {[
            {
              title: "Company",
              links: [
                { name: "About Us", href: "/about" },
                { name: "Contact Concierge", href: "/contact" },
                { name: "Partner with Flyout", href: "/partner" },
                { name: "Travel Journal", href: "/blog" }
              ]
            },
            {
              title: "Experiences",
              links: [
                { name: "Desert Safaris", href: "/desert-safari" },
                { name: "Theme Parks", href: "/theme-parks" },
                { name: "Private Yachts", href: "/yacht" },
                { name: "City Explorations", href: "/city-tours" },
                { name: "Luxury Collection", href: "/luxury" }
              ]
            },
            {
              title: "Support",
              links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Cancellations & Refunds", href: "/refund" },
                { name: "FAQs", href: "/faqs" },
                { name: "Blogs", href: "/blogs" },
              ]
            },
            {
              title: "Destinations",
              links: [
                { name: "Dubai", href: "/dubai" },
                { name: "Abu Dhabi", href: "/abu-dhabi" },
                { name: "Sharjah", href: "/sharjah" },
                { name: "Ras Al Khaimah", href: "/ras-al-khaimah" },
                { name: "Ajman", href: "/ajman" }
              ]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-display text-white mb-8 block">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 font-light hover:text-flyout-gold hover:pl-2 transition-all duration-300 text-sm block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TRUST & EMOTIONAL CLOSING */}
      <div className="section-container px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col items-center justify-center gap-8 border-t border-white/5 pt-12">

          {/* Trust Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-full px-8 py-3 backdrop-blur-sm flex items-center justify-center gap-8 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Excellent</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <div key={s} className="bg-[#00b67a] p-0.5 rounded-[1px]"><Star size={10} className="fill-white text-white" /></div>)}
              </div>
              <span className="text-[10px] text-slate-400 ml-1">on Trustpilot</span>
            </div>
            <div className="w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
              <Shield size={14} className="text-flyout-gold" />
              Secure Booking
            </div>
          </div>

          <p className="text-center font-display italic text-lg text-slate-500 opacity-60">
            "From sky to sea, desert to skyline — Flyout designs journeys worth remembering."
          </p>
        </div>
      </div>

      {/* 5. LEGAL STRIP */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="section-container px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-slate-600 font-medium tracking-wide">
              © {currentYear} FLYOUT TOURS LLC. ALL RIGHTS RESERVED.
            </p>

            <div className="flex gap-4 items-center opacity-80 hover:opacity-100 transition-opacity duration-300 h-6 w-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]">
              <FaCcVisa className="h-6 w-auto" />
              <FaCcMastercard className="h-6 w-auto" />
              <FaApplePay className="h-6 w-auto" />
              <FaGooglePay className="h-6 w-auto" />
            </div>


            <div className="flex gap-6">
              <Link to="/privacy" className="text-[11px] text-slate-600 hover:text-flyout-gold transition-colors uppercase tracking-wider font-medium">Privacy</Link>
              <Link to="/terms" className="text-[11px] text-slate-600 hover:text-flyout-gold transition-colors uppercase tracking-wider font-medium">Terms</Link>
              <Link to="/cookies" className="text-[11px] text-slate-600 hover:text-flyout-gold transition-colors uppercase tracking-wider font-medium">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

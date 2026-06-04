import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart3, Globe, ShoppingCart, MapPin, ArrowRight, Menu, X, Bot, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0b10]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between max-w-[1200px]">
        <div className="text-xl font-bold tracking-tight text-primary font-[Space_Grotesk]">
          scalemedia<span className="text-white/60">.co</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("services")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How It Works</button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Button 
            onClick={() => scrollTo("book-call")} 
            className="font-semibold bg-primary text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all rounded-full px-6"
          >
            Book a Free Call
          </Button>
        </div>
        
        <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-[#0a0b10]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl p-5 md:hidden flex flex-col gap-3">
            <button onClick={() => scrollTo("services")} className="text-left py-3 text-base font-medium text-slate-300 border-b border-white/[0.06]">Services</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-left py-3 text-base font-medium text-slate-300 border-b border-white/[0.06]">How It Works</button>
            <Button className="w-full mt-2 bg-primary text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] rounded-full h-12 text-base" onClick={() => scrollTo("book-call")}>
              Book a Free Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 md:pt-40 md:pb-28 px-4 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.25) 0%, transparent 70%)" }} />
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto max-w-[1200px] text-center relative z-10 w-full">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger} 
          className="max-w-4xl mx-auto flex flex-col items-center gap-5"
        >
          <motion.h1 
            variants={fadeUp} 
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-[Space_Grotesk] font-bold tracking-tighter leading-[1.05] text-white"
          >
            We Help Local Businesses{" "}
            <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Grow Online</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mt-1 leading-relaxed px-2">
            We build websites, set up SEO, and create marketing systems that help Indian businesses attract more customers online.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-13 px-7 text-base rounded-full font-bold bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-[0_0_32px_rgba(139,92,246,0.4)] hover:shadow-[0_0_48px_rgba(139,92,246,0.6)] transition-all" onClick={() => document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })}>
              Book a Free Call
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto h-13 px-7 text-base rounded-full font-semibold text-white hover:bg-white/5 transition-colors" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              See Our Services <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: <Globe className="w-6 h-6 text-white" />, title: "Website Design", desc: "A professional, mobile-fast website that represents your business online 24/7 and makes it easy for customers to reach you.", color: "bg-blue-500" },
    { icon: <MapPin className="w-6 h-6 text-white" />, title: "Google Business Setup", desc: "We set up and optimise your Google Business profile so your shop appears when people nearby search for your services.", color: "bg-red-500" },
    { icon: <BarChart3 className="w-6 h-6 text-white" />, title: "SEO", desc: "Targeted search optimisation so your business shows up for the right searches in your city.", color: "bg-purple-500" },
    { icon: <ShoppingCart className="w-6 h-6 text-white" />, title: "E-commerce Setup", desc: "We build an online store so your customers can browse, order, and pay — from anywhere.", color: "bg-teal-500" },
    { icon: <MessageCircle className="w-6 h-6 text-white" />, title: "WhatsApp Automation", desc: "Automated replies, booking confirmations, and follow-ups so no enquiry goes unanswered.", color: "bg-green-500" },
    { icon: <Bot className="w-6 h-6 text-white" />, title: "AI Automation", desc: "Automate repetitive tasks — lead follow-ups, appointment reminders, data entry — so your team focuses on what matters.", color: "bg-indigo-500" },
    { icon: <Phone className="w-6 h-6 text-white" />, title: "AI Voice Call Agent", desc: "An AI agent that answers calls, qualifies leads, and books appointments for your business — 24/7, without a receptionist.", color: "bg-violet-600" },
  ];

  return (
    <section id="services" className="py-16 md:py-28 px-4">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center mb-12 md:mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] text-violet-400 uppercase mb-3">What We Do</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-bold tracking-tight mb-4 text-white">Our Services</h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">Everything a local business needs to have a real, working online presence.</p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              whileHover={{ y: -4 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${s.color}`}></div>
              <div className={`mb-5 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${s.color}`}>
                {s.icon}
              </div>
              <h3 className="text-lg md:text-xl font-[Space_Grotesk] font-semibold mb-2 text-white">{s.title}</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Audit Your Business", desc: "We review your current online presence and discuss what you need — no jargon, just a clear plan." },
    { num: "02", title: "Build Your Online Presence", desc: "We design your website and set up your Google profile so customers can find and contact you easily." },
    { num: "03", title: "Grow with Marketing", desc: "We add SEO and automation tools that keep bringing in enquiries — and we support you along the way." }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-28 px-4">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center mb-12 md:mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] text-violet-400 uppercase mb-3">Process</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-bold tracking-tight text-white">How It Works</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="hidden md:block absolute top-[52px] left-[18%] right-[18%] border-t border-dashed border-white/10 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } } }}
              className="flex flex-col items-center text-center px-4 py-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                <span className="text-lg font-[Space_Grotesk] font-bold text-violet-400">{step.num}</span>
              </div>
              <h3 className="text-lg md:text-xl font-[Space_Grotesk] font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookCall() {
  return (
    <section id="book-call" className="py-16 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
      <div className="container mx-auto max-w-2xl relative z-10 w-full text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="flex flex-col items-center gap-6">
          <motion.div variants={fadeUp} className="text-[11px] font-bold tracking-[0.2em] text-violet-400 uppercase">Get Started</motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-bold tracking-tight text-white">
            Let's Talk About Your Business
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg max-w-xl">
            Book a free 20-minute call with our team. We'll understand your goals and tell you exactly how we can help — no pressure, no jargon.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="https://t.me/scaleemediaagency"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-14 px-10 text-base sm:text-lg rounded-full font-bold bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_32px_rgba(139,92,246,0.4)] hover:shadow-[0_0_48px_rgba(139,92,246,0.6)] transition-all"
            >
              <Phone className="w-5 h-5" /> Book a Free Call
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-slate-600">No commitment. No sales pitch. Just an honest conversation.</motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>
      
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="text-2xl font-[Space_Grotesk] font-bold tracking-tight text-white mb-2">scalemedia<span className="text-white/40">.co</span></div>
            <p className="text-sm text-slate-400">We help local businesses grow online.</p>
          </div>
          <Button
            className="rounded-full bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all font-semibold px-6"
            onClick={() => document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Phone className="w-4 h-4 mr-2" /> Book a Free Call
          </Button>
        </div>
        
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} scalemedia.co. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <BookCall />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={() => <div className="min-h-screen flex items-center justify-center bg-background text-white text-2xl font-[Space_Grotesk]">404 | Not Found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

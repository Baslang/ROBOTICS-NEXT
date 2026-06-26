import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Tv, 
  Layers, 
  ChevronRight, 
  Check, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ArrowUpRight,
  Play,
  Pause,
  Eye,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  X,
  Cpu,
  Star,
  Award,
  CheckCircle,
  Factory,
  HeartPulse,
  Package,
  Sprout,
  Shield,
  GraduationCap
} from 'lucide-react';
import AnimatedHeading from './components/AnimatedHeading';
import HeroSubtitle from './components/HeroSubtitle';
import SectionTitle from './components/SectionTitle';
import SectionSubheading from './components/SectionSubheading';
import BodyParagraph from './components/BodyParagraph';
import StatisticNumber from './components/StatisticNumber';
import StatisticLabel from './components/StatisticLabel';
import FadeIn from './components/FadeIn';
import RobotCoreShowcase from './components/RobotCoreShowcase';
import aboutUsImage from './assets/images/vex_about_us_1782022851903.jpg';

type LayoutMode = 'custom-ash' | 'video-demo' | 'interactive-spotlight';
type AshShade = {
  name: string;
  class: string;
  hex: string;
};

const ASH_SHADES: AshShade[] = [
  { name: 'Volcanic Midnight', class: 'bg-[#0E0E10]', hex: '#0E0E10' },
  { name: 'Geometric Ash', class: 'bg-[#B7B7B7]', hex: '#B7B7B7' },
  { name: 'Brutalist Chalk', class: 'bg-[#D2D2D2]', hex: '#D2D2D2' },
  { name: 'Clean Concrete', class: 'bg-[#9E9E9E]', hex: '#9E9E9E' }
];

const Logo = () => (
  <div className="relative group flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 border border-white/10 hover:border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300">
    <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[#00D4FF]/10 to-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <svg 
      className="w-6 h-6 text-[#00D4FF] transform group-hover:scale-105 transition-all duration-300" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" className="opacity-20" />
      
      <path 
        d="M12 12H22C25.3 12 27 13.5 27 16.5C27 19.5 25.3 21 22 21H16V28H12V12Z" 
        stroke="url(#logo-grad-1)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-95"
      />
      <path 
        d="M18 21L28 28M28 12V28M22 16.5H16" 
        stroke="url(#logo-grad-2)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      <circle cx="22" cy="16.5" r="2" fill="#00D4FF" className="animate-pulse" />
      <circle cx="28" cy="12.0" r="1.5" fill="#3B82F6" />
      <circle cx="18" cy="21.0" r="1.5" fill="#3B82F6" />
      <circle cx="28" cy="28.0" r="2" fill="#00D4FF" />
      <circle cx="12" cy="12.0" r="1.5" fill="#FFFFFF" />

      <defs>
        <linearGradient id="logo-grad-1" x1="12" y1="12" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="16" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#00D4FF" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('interactive-spotlight');
  const [ashShade, setAshShade] = useState<AshShade>(ASH_SHADES[0]);
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  
  // Simulated Interactive Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Welcome to Robotics Next Core System. How can we accelerate your intelligent automation today?' }
  ]);

  // Newsletter simulated subscription
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Contact form submission simulator
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Spotlight math trailing state (6 trail circles starting off-screen)
  const [points, setPoints] = useState(() => Array.from({ length: 6 }, () => ({ x: -1000, y: -1000 })));
  const targetRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 });
  const [currentRadius, setCurrentRadius] = useState(420);
  const targetRadiusRef = useRef(420);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Real-time autonomous stats state (Fulfills note: "Make sure this section is in autonomous real-time")
  // Begins at user requests: 500+ Projects Completed, 50+ Tech Experts, 30+ Countries, 98% Satisfaction
  const [stats, setStats] = useState({
    projects: 512,
    experts: 54,
    countries: 32,
    satisfaction: 98.42,
    operationalFrequency: 2400.15
  });

  // Keep changing numbers autonomously with realistic minor fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        // Steady slow increase in completed projects simulation
        projects: prev.projects + (Math.random() > 0.94 ? 1 : 0),
        experts: prev.experts, // Standard core roster
        countries: prev.countries,
        // Minor dynamic shifts in real-time satisfaction rate decimal points
        satisfaction: parseFloat(Math.max(98.15, Math.min(99.98, prev.satisfaction + (Math.random() * 0.04 - 0.02))).toFixed(2)),
        // Rapid frequency micro movements for real-world mechanical network ticker
        operationalFrequency: parseFloat((2400.00 + Math.random() * 8.50).toFixed(2))
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Synchronise video play state with isPlaying
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Track cursor coordinates for interactive-spotlight mode
  useEffect(() => {
    if (layoutMode !== 'interactive-spotlight') return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [layoutMode]);

  // Smoothly transition baseRadius from 420 to 520 based on document scrolling
  useEffect(() => {
    if (layoutMode !== 'interactive-spotlight') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (scrollY > viewportHeight * 0.45) {
        targetRadiusRef.current = 520;
      } else {
        targetRadiusRef.current = 420;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layoutMode]);

  // Unified high-performance RAF loop for trailing mouse circles & smooth radius sizing
  useEffect(() => {
    if (layoutMode !== 'interactive-spotlight') return;

    let animationFrameId: number;
    let active = true;

    // Center initial coordinate point values
    setPoints(Array.from({ length: 6 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })));

    const tick = () => {
      if (!active) return;

      // Smoothly update radius with 0.1 lerp
      setCurrentRadius(prev => prev + (targetRadiusRef.current - prev) * 0.1);

      // Trailing math easing state update
      setPoints(prevPoints => {
        const target = targetRef.current;
        const nextPoints = [...prevPoints];

        // 1. Leader with 0.2 lerp
        nextPoints[0] = {
          x: nextPoints[0].x + (target.x - nextPoints[0].x) * 0.2,
          y: nextPoints[0].y + (target.y - nextPoints[0].y) * 0.2
        };

        // 2. Followers with 0.35 lerp
        for (let i = 1; i < nextPoints.length; i++) {
          nextPoints[i] = {
            x: nextPoints[i].x + (nextPoints[i - 1].x - nextPoints[i].x) * 0.35,
            y: nextPoints[i].y + (nextPoints[i - 1].y - nextPoints[i].y) * 0.35
          };
        }

        return nextPoints;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [layoutMode]);

  // Dynamic intersection handler to update active Tab state during scrolling
  useEffect(() => {
    const sections = ['about-us', 'services', 'projects', 'industries', 'contact'];
    
    const handleScrollDetect = () => {
      const scrollY = window.scrollY;
      const threshold = 120;
      
      if (scrollY < 200) {
        setActiveTab('Home');
        return;
      }
      
      let currentActive = 'Home';
      for (const section of sections) {
        const el = document.getElementById(`${section}-section`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold + 60) {
            if (section === 'about-us') currentActive = 'About Us';
            else if (section === 'services') currentActive = 'Services';
            else if (section === 'projects') currentActive = 'Projects';
            else if (section === 'industries') currentActive = 'Industries';
            else if (section === 'contact') currentActive = 'Contact';
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener('scroll', handleScrollDetect);
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const sectionId = tab.toLowerCase().replace(/\s+/g, '-');
    const el = document.getElementById(`${sectionId}-section`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startChat = () => {
    setChatOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Program a realistic simulated intelligent AI agent response
    setTimeout(() => {
      let reply = "Your request has been routed to our Advanced Systems Division. A consultation specialist will contact you details directly.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('price') || lower.includes('cost')) {
        reply = "Custom system deployments are scaled precisely to your operational requirements. Let's schedule a deep-dive engineering review.";
      } else if (lower.includes('humanoid') || lower.includes('robot')) {
        reply = "Our Sovereign Humanoid Series (Units H01 through H10) represent peak physical locomotion. They are configured with real-time hardware loop telemetry.";
      } else if (lower.includes('demo') || lower.includes('consult')) {
        reply = "Consultation scheduled simulator active. We've logged your network identifier to allocate an automation roadmap session.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 5000);
  };

  const handleResetAnimation = () => {
    setTriggerKey(prev => prev + 1);
  };

  // Theme helper variables for responsive contrast
  const isSpotlight = layoutMode === 'interactive-spotlight';
  const isVideoDemo = layoutMode === 'video-demo';

  const textColor = isSpotlight 
    ? 'text-[#FF3838]' // Glowing magma scarlet red
    : isVideoDemo 
      ? 'text-white' 
      : 'text-[#141414]';

  const subtitleColor = isSpotlight 
    ? 'text-[#FF8A8A]' // Warm ember soft red
    : isVideoDemo 
      ? 'text-gray-300' 
      : 'text-[#141414]/75';

  const tabColor = (tab: string) => {
    if (activeTab === tab) {
      if (isSpotlight) return 'text-[#FF3838] font-bold';
      return isVideoDemo ? 'text-white font-bold' : 'text-[#141414] font-bold';
    }
    if (isSpotlight) return 'text-[#FF8A8A]/50 hover:text-[#FF3838]';
    return isVideoDemo ? 'text-gray-400 hover:text-white' : 'text-[#141414]/50 hover:text-[#141414]';
  };

  const activeTabLineColor = isSpotlight 
    ? 'bg-[#FF3838]' 
    : isVideoDemo 
      ? 'bg-white' 
      : 'bg-[#141414]';

  const sectionBorderColor = isSpotlight 
    ? 'border-[#FF3838]/15' 
    : isVideoDemo 
      ? 'border-white/10' 
      : 'border-[#141414]/10';

  const bulletCheckColor = isSpotlight 
    ? 'text-white bg-[#FF3838]' 
    : isVideoDemo 
      ? 'text-black bg-white' 
      : 'text-black bg-white/60';
  
  const cardGlassClass = isVideoDemo 
    ? 'bg-white/5 hover:bg-white/10 border-white/10 shadow-2xl text-white' 
    : isSpotlight
      ? 'bg-white/5 hover:bg-white/10 border-[#FF3838]/20 shadow-2xl text-[#FF3838]' 
      : 'bg-white/40 hover:bg-white/60 border-[#141414]/15 shadow-xl text-[#141414]';

  return (
    <div 
      className={`relative w-full min-h-screen transition-colors duration-700 ease-in-out font-sans overflow-y-auto select-none ${
        isVideoDemo 
          ? 'bg-black text-white' 
          : isSpotlight 
            ? `${ashShade.class} text-[#FF3838]` 
            : `${ashShade.class} text-[#141414]`
      }`}
    >
      {/* 1. BACKGROUND VIDEO (Fixed for cinematic layout) */}
      {layoutMode === 'video-demo' && (
        <video
          key="background-video-demo"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-40 lg:opacity-50"
        />
      )}

      {/* 1b. PREMIUM INTERACTIVE SPOTLIGHT MASK LAYER AND CINEMATIC VIDEO */}
      {layoutMode === 'interactive-spotlight' && (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
          <video
            ref={videoRef}
            src="https://cdn.higgsfield.ai/job_set_chain_preset/508c2da7-2f1d-4109-8090-d300feac8c73.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />

          {/* Interactive neon trail light projections */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="neon-glow-spotlight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF3838" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#FF3838" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FF3838" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {points.map((pt, idx) => {
              const scaleFactor = idx === 0 ? 1.0 : 0.85 - (idx - 1) * 0.12;
              const radius = Math.max(30, currentRadius * 0.45 * scaleFactor);
              return (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={radius}
                  fill="url(#neon-glow-spotlight)"
                  style={{ mixBlendMode: 'screen' }}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* 2. LIQUID GLASS NOISE */}
      {layoutMode === 'custom-ash' && (
        <div className="fixed inset-0 opacity-15 pointer-events-none mix-blend-overlay z-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.05) 70%)`
        }} />
      )}

      {/* Global Scroll Layer Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* ==================== HERO VIEWPORT ==================== */}
        <div className="w-full min-h-screen flex flex-col justify-between relative">
          
          {/* NAVBAR */}
          <header className="w-full px-4 md:px-12 lg:px-16 pt-6">
            <nav className="liquid-glass rounded-xl px-4 md:px-6 py-3 flex items-center justify-between shadow-2xl border border-white/10">
              
              {/* Left Brand - Rebranded with ROBOTICS NEXT */}
              <div className="flex items-center gap-3 select-none">
                <Logo />
                <span className="text-xl md:text-2xl text-3d">
                  ROBOTICS NEXT
                </span>
              </div>

              {/* Center Navigation Links - Responsive scroll links */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {['Home', 'About Us', 'Services', 'Projects', 'Industries', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => handleTabClick(link)}
                    className={`text-sm font-medium transition-all duration-300 relative py-1 cursor-pointer uppercase tracking-wider ${tabColor(link)}`}
                  >
                    {link}
                    {activeTab === link && (
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full ${activeTabLineColor}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Right CTA */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={startChat}
                  className="btn-premium px-5 py-2.5 rounded-lg text-sm cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </header>

          {/* DYNAMIC ADAPTING HERO CONTENT */}
          <main className="w-full px-6 md:px-12 lg:px-16 pt-12 pb-16 flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto z-10">
            <span className={`text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4 px-2.5 py-1 rounded inline-flex items-center gap-2 ${
              isSpotlight ? 'bg-[#FF3838]/10 text-[#FF3838]' : isVideoDemo ? 'bg-white/15 text-white' : 'bg-[#141414]/10 text-[#141414]'
            }`}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              INTELLIGENT SYSTEMS PROTOCOL 2026
            </span>

            {/* Exact Header matching requested prompt exactly */}
            <AnimatedHeading
              text="BUILDING THE FUTURE WITH ROBOTICS & ARTIFICIAL INTELLIGENCE"
              className="mb-8"
              triggerKey={triggerKey}
            />

            {/* Exact description body matching requested prompt exactly */}
            <HeroSubtitle
              text="Transforming industries through intelligent automation, advanced robotics, machine learning, and innovative engineering solutions."
              className="mb-10"
              triggerKey={triggerKey}
            />

            {/* Exact buttons requested: Button 1: Get Started, Button 2: Schedule Consultation */}
            <FadeIn delay={700} duration={1000} className="w-full flex justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={startChat}
                  className="btn-premium px-8 py-4 rounded-xl shadow-xl w-full sm:w-auto cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={startChat}
                  className="btn-premium px-8 py-4 rounded-xl shadow-xl w-full sm:w-auto cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </FadeIn>
          </main>

          {/* Scroll directive indicators */}
          <div className="w-full flex justify-center pb-8">
            <button
              onClick={() => handleTabClick('About Us')}
              className={`text-[10px] uppercase font-bold font-mono tracking-widest ${textColor}/60 animate-bounce flex items-center gap-1.5 cursor-pointer`}
            >
              Discover Robotics Next <span>↓</span>
            </button>
          </div>

        </div>

        {/* ==================== ABOUT US SECTION ==================== */}
        <section 
          id="about-us-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start justify-center">
              <span className={`text-xs uppercase tracking-[0.25em] font-semibold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Pioneering Intelligent Automation
              </span>
              
              {/* Prompt Request: About Us Header */}
              <SectionTitle
                text="ABOUT US"
                className="mb-4"
                triggerKey={triggerKey}
              />
              <SectionSubheading
                text="Innovating Tomorrow's Technology Today"
                className="mb-6"
                triggerKey={triggerKey}
              />
              
              {/* Prompt Request: Primary Company Info Description */}
              <BodyParagraph
                text="Robotics Next is a leading robotics and artificial intelligence company dedicated to creating intelligent solutions that empower businesses and organizations. Our team of engineers, AI specialists, software developers, and automation experts work together to build next-generation robotic systems that solve real-world challenges."
                className="mb-6 text-left !mx-0"
                triggerKey={triggerKey}
              />

              <BodyParagraph
                text="From industrial automation and autonomous robots to AI-powered analytics and smart manufacturing, we help organizations embrace the future of tech. We are architecting secure, reliable systems designed to mesh human workflows and machine speed perfectly."
                className="mb-8 text-left !mx-0 opacity-85"
                triggerKey={triggerKey}
              />

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
                <div className={`p-6 rounded-xl border ${cardGlassClass}`}>
                  <h2 className="font-sans font-bold text-base md:text-lg leading-[1.7] text-[#94A3B8] animate-fade-up-paragraph mb-3 uppercase">
                    OUR MISSION
                  </h2>
                  <p className="font-sans font-normal text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] leading-[1.8] tracking-[0.2px] text-[#CBD5E1] animate-fade-up-paragraph">
                    To accelerate global innovation through intelligent robotics and AI solutions that improve efficiency, safety, and sustainability.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${cardGlassClass}`}>
                  <h2 className="font-sans font-bold text-base md:text-lg leading-[1.7] text-[#94A3B8] animate-fade-up-paragraph mb-3 uppercase">
                    OUR VISION
                  </h2>
                  <p className="font-sans font-normal text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] leading-[1.8] tracking-[0.2px] text-[#CBD5E1] animate-fade-up-paragraph">
                    To become a global leader in robotic innovation, creating technologies that enhance human capabilities and transform industries.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column using established vex_about_us image asset */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-md group">
                <div className={`absolute -inset-2 rounded-2xl opacity-40 blur-xl transition-all duration-500 group-hover:opacity-75 ${
                  layoutMode === 'custom-ash' ? 'bg-[#141414]/20' : 'bg-white/10'
                }`} />
                
                <div className="liquid-glass rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl relative">
                  <img 
                    src={aboutUsImage} 
                    alt="Robotics Next High Fidelity Neural Systems" 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto aspect-[4/3] object-cover rounded-xl transition-all duration-700 select-none grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== OUR SERVICES SECTION ==================== */}
        <section 
          id="services-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500 bg-black/5`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Operational Capabilities
              </span>
              <SectionTitle
                text="OUR SERVICES"
                className="mb-3"
                triggerKey={triggerKey}
              />
              <SectionSubheading
                text="Advanced Robotics Development"
                className="mb-5"
                triggerKey={triggerKey}
              />
              <BodyParagraph
                text="Intelligent automation platforms architecture designed for enterprise scaling, machine speed, and hardware-in-the-loop stability."
                className="text-left !mx-0"
                triggerKey={triggerKey}
              />
            </div>

            {/* Services Grid (6 services precisely matching the prompt text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Service 1 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Cpu className="animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Advanced Robotics Development</h3>
                  <p className="service-card-desc mb-6">
                    Custom robotic systems designed for manufacturing, logistics, healthcare, agriculture, and commercial applications.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Sparkles />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Artificial Intelligence Solutions</h3>
                  <p className="service-card-desc mb-6">
                    Machine learning, computer vision, predictive analytics, and intelligent decision-making systems tailored to coordinate multiple arrays.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Service 3 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Zap />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Industrial Automation</h3>
                  <p className="service-card-desc mb-6">
                    Streamline operations with automated workflows, robotic process automation, and smart factory solutions yielding maximum efficiency.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Service 4 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Globe />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Autonomous Systems</h3>
                  <p className="service-card-desc mb-6">
                    Development of autonomous robots, drones, and intelligent navigation systems leveraging advanced sensor fusion capabilities.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Service 5 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Layers />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Robotics Consulting</h3>
                  <p className="service-card-desc mb-6">
                    Expert guidance for organizations seeking to implement robotics and AI technologies smoothly with scalable structural ROI.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Service 6 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Activity />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Research & Innovation</h3>
                  <p className="service-card-desc mb-6">
                    Cutting-edge R&D services focused on emerging physical technologies, advanced materials, and future software capabilities.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== WHY CHOOSE US SECTION ==================== */}
        <section 
          id="why-choose-us-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Differentiating Factors
              </span>
              <SectionTitle
                text="Why Choose Us"
                className="mb-3"
                triggerKey={triggerKey}
              />
              <SectionSubheading
                text="Artificial Intelligence Solutions"
                className="mb-5"
                triggerKey={triggerKey}
              />
              <BodyParagraph
                text="Our technical standard combinatory matrix guarantees seamless physical integration, secure operations, and continuous optimization."
                className="text-left !mx-0"
                triggerKey={triggerKey}
              />
            </div>

            {/* 6 Reasons Bento List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Reason 1 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Award className="animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Industry Expertise</h3>
                  <p className="service-card-desc mb-6">
                    Years of experience delivering innovative robotic and AI solutions across multiple industries. Our developers understand your regulatory requirements.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Reason 2 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Layers />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Custom Solutions</h3>
                  <p className="service-card-desc mb-6">
                    Every project is tailored to meet the unique needs and objectives of our clients instead of deploying pre-made cookie-cutter software layers.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Reason 3 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Cpu />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Advanced Technology</h3>
                  <p className="service-card-desc mb-6">
                    We leverage the latest advancements in robotics, machine learning, deep neural nets, and autonomous kinematics loop processing.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Reason 4 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Clock />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Reliable Support</h3>
                  <p className="service-card-desc mb-6">
                    Comprehensive maintenance, active remote hardware monitoring, training, and 24/7 technical support services to prevent downtime events.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Reason 5 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <TrendingUp />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Scalable Systems</h3>
                  <p className="service-card-desc mb-6">
                    Physical and logical solutions designed to grow alongside your volume metrics and integrate with next-generation sensor stacks.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Reason 6 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <CheckCircle />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Proven Results</h3>
                  <p className="service-card-desc mb-6">
                    Successful global deployments that improve operational efficiency, minimize worker hazards, reduce structural overhead, and amplify yield.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== INDUSTRIES WE SERVE ==================== */}
        <section 
          id="industries-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500 bg-black/10`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Deployment Domains
              </span>
              <SectionTitle
                text="Industries We Serve"
                className="mb-5"
                triggerKey={triggerKey}
              />
              <BodyParagraph
                text="Embedding smart mechanisms into primary economic pillars to facilitate extreme precision, reduce risk boundaries, and guarantee absolute scale."
                className="text-left !mx-0"
                triggerKey={triggerKey}
              />
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Domain 1 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Factory />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Manufacturing</h3>
                  <p className="service-card-desc mb-6">
                    Smart factories, robotic assembly lines, high-accuracy quality inspection arrays, and autonomous production flow automation systems.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Domain 2 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <HeartPulse />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Healthcare</h3>
                  <p className="service-card-desc mb-6">
                    Medical assistive robotics, AI-driven digital diagnostics support, gentle bedside patient assistance units, and sterile pharmacy automation.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Domain 3 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Package />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Logistics</h3>
                  <p className="service-card-desc mb-6">
                    Autonomous high-immediacy warehouse layout coordination, real-time drone assets, inventory micro-tracking, and rapid fulfillment robotics.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Domain 4 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Sprout />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Agriculture</h3>
                  <p className="service-card-desc mb-6">
                    Precision farming sensor arrays, automated soil and crop monitoring drone paths, autonomous harvesting mechanical structures, and smart irrigation.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Domain 5 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Shield />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Defense & Security</h3>
                  <p className="service-card-desc mb-6">
                    Intelligent surveillance systems, autonomous physical security patrol robots, and remote dangerous zone telemetry analysis structures.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Domain 6 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <GraduationCap />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Education & Research</h3>
                  <p className="service-card-desc mb-6">
                    Next-generation robotic physical training platforms, neural AI laboratory simulators, and educational software integrations.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== FEATURED PROJECTS SECTION ==================== */}
        <section 
          id="projects-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Engineering Achievements
              </span>
              <SectionTitle
                text="Featured Projects"
                className="mb-5"
                triggerKey={triggerKey}
              />
              <BodyParagraph
                text="Review our deployed installations around the globe, showing machine precision, secure kinematics integration, and operational statistics."
                className="text-left !mx-0"
                triggerKey={triggerKey}
              />
            </div>

            {/* 4 Featured Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              
              {/* Project 1 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Package />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Intelligent Warehouse Robot</h3>
                  <p className="service-card-desc mb-6">
                    An autonomous warehouse solution capable of inventory tracking, package handling, obstacle avoidance, and dynamic route optimization.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Project 2 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Cpu />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">AI-Powered Inspection System</h3>
                  <p className="service-card-desc mb-6">
                    High throughput computer vision technology that detects complicated micro-manufacturing defects with exceptional sub-millimeter accuracy.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Project 3 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Sprout />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Autonomous Agricultural Robot</h3>
                  <p className="service-card-desc mb-6">
                    A smart precision farming robot designed for continuous crop monitoring, real-time soil data collection, and physical agricultural harvest support.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Project 4 */}
              <div className="service-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="service-icon-container">
                      <Shield />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white font-sans">Smart Security Platform</h3>
                  <p className="service-card-desc mb-6">
                    An AI-driven continuous enterprise surveillance and physical robotic patrol system configured for immediate threat identification.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="service-card-btn group">
                    Learn More <span className="service-card-btn-arrow inline-block">→</span>
                  </button>
                </div>
              </div>

            </div>

            {/* EMBED SOVEREIGN HUMANOID SERIES PORTRAITS SHOWCASE */}
            <div className="mt-20 pt-16 border-t border-white/10">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
                <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-2 px-2 py-0.5 rounded bg-cyan-400/15">
                  EXCLUSIVE HARDWARE DEMO
                </span>
                <h3 className="text-2xl md:text-4xl font-normal text-white uppercase tracking-tight mb-4">
                  Sovereign Humanoid Node Explorer
                </h3>
                <p className="text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed">
                  We design and construct production-ready humanoid units capable of running looping motion video frames. Explore our 10 premier model specifications in a beautiful portrait grid of 75% image height.
                </p>
              </div>

              {/* Renders our premium portrait image-video cards */}
              <RobotCoreShowcase 
                isSpotlight={isSpotlight}
                textColor={textColor}
                subtitleColor={subtitleColor}
                cardGlassClass={cardGlassClass}
                layoutMode={layoutMode}
              />
            </div>

            {/* TECHNOLOGY STACK SUBSECTION */}
            <div className="mt-24 pt-16 border-t border-white/10 text-center">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-amber-500 block mb-6">
                [ ROBOTICS NEXT TECH MATRIX_STACK ]
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                {[
                  'Artificial Intelligence', 'Machine Learning', 'Computer Vision', 
                  'Deep Learning', 'Autonomous Navigation', 'IoT Integration', 
                  'Cloud Robotics', 'Embedded Systems', 'Sensor Fusion', 'Edge Computing'
                ].map((tech) => (
                  <span 
                    key={tech} 
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isSpotlight 
                        ? 'bg-[#FF3838]/5 border-[#FF3838]/20 text-white' 
                        : 'bg-white/5 border-white/10 text-gray-100 hover:border-white/30'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ==================== AUTONOMOUS REAL-TIME STATISTICS SECTION ==================== */}
        <section 
          id="statistics-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} bg-black/40 transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                TRACK RECORD
              </span>
              <h2 className={`text-3xl md:text-5xl font-light tracking-tight mb-5 ${textColor}`}>
                Performance Statistics
              </h2>
              <BodyParagraph
                text="A summary of our verified physical deployments worldwide, expert specifications, and client satisfaction metrics. Engineered to deliver exceptional real-world results."
                className="text-left !mx-0"
                triggerKey={triggerKey}
              />
            </div>

            {/* 4 Statistics Metrics (Real-time dynamic ticking) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Stat 1: 500+ Projects Completed */}
              <div className={`p-8 rounded-xl border flex flex-col justify-center group transition-all duration-300 hover:-translate-y-1 ${cardGlassClass}`}>
                <div>
                  <StatisticLabel text="PROJECTS COMPLETED" className="mb-2" />
                  {/* Real-time ticks starting at 500+ */}
                  <StatisticNumber value={stats.projects} suffix="+" />
                </div>
              </div>

              {/* Stat 2: 50+ Technology Experts */}
              <div className={`p-8 rounded-xl border flex flex-col justify-center group transition-all duration-300 hover:-translate-y-1 ${cardGlassClass}`}>
                <div>
                  <StatisticLabel text="TECHNOLOGY EXPERTS" className="mb-2" />
                  <StatisticNumber value={stats.experts} suffix="+" />
                </div>
              </div>

              {/* Stat 3: 30+ Countries Served */}
              <div className={`p-8 rounded-xl border flex flex-col justify-center group transition-all duration-300 hover:-translate-y-1 ${cardGlassClass}`}>
                <div>
                  <StatisticLabel text="COUNTRIES SERVED" className="mb-2" />
                  <StatisticNumber value={stats.countries} suffix="+" />
                </div>
              </div>

              {/* Stat 4: 98% Client Satisfaction Rate */}
              <div className={`p-8 rounded-xl border flex flex-col justify-center group transition-all duration-300 hover:-translate-y-1 ${cardGlassClass}`}>
                <div>
                  <StatisticLabel text="CLIENT SATISFACTION" className="mb-2" />
                  {/* Fluctatues slightly around 98.42% */}
                  <StatisticNumber value={stats.satisfaction} suffix="%" decimals={2} />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== TESTIMONIALS SECTION ==================== */}
        <section 
          id="testimonials-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-4 px-2.5 py-1 rounded inline-block ${
                layoutMode === 'custom-ash' ? 'bg-[#141414]/10 text-[#141414]/70' : 'bg-white/10 text-white/85'
              }`}>
                Client Endorsements
              </span>
              <h2 className={`text-3xl md:text-5xl font-light tracking-tight mb-5 ${textColor}`}>
                What Clients Say
              </h2>
              <p className={`text-base md:text-lg font-light leading-relaxed ${subtitleColor}`}>
                Read testimonies verified directly from industrial manufacturing leads, technology executives & infrastructure coordinators.
              </p>
            </div>

            {/* Testimonials Grid Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Testimonial 1 */}
              <div className={`p-8 rounded-xl border relative flex flex-col justify-between ${cardGlassClass}`}>
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4 text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="testimonial-content">
                    "The automation solution developed by Robotics Next significantly increased our production efficiency while reducing operational costs."
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex flex-col">
                  <span className="testimonial-name tracking-tight mb-1">Michael Johnson</span>
                  <h3 className="text-xs text-blue-400 font-bold font-mono tracking-wider uppercase">Manufacturing Director</h3>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className={`p-8 rounded-xl border relative flex flex-col justify-between ${cardGlassClass}`}>
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4 text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="testimonial-content">
                    "Their AI-powered systems exceeded our expectations and delivered measurable results within months."
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex flex-col">
                  <span className="testimonial-name tracking-tight mb-1">Sarah Williams</span>
                  <h3 className="text-xs text-blue-400 font-bold font-mono tracking-wider uppercase">Operations Manager</h3>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className={`p-8 rounded-xl border relative flex flex-col justify-between ${cardGlassClass}`}>
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4 text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="testimonial-content">
                    "Exceptional expertise, innovative solutions, and outstanding customer support throughout the entire project."
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex flex-col">
                  <span className="testimonial-name tracking-tight mb-1">David Chen</span>
                  <h3 className="text-xs text-blue-400 font-bold font-mono tracking-wider uppercase">Technology Executive</h3>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== CALL TO ACTION SECTION ==================== */}
        <section 
          className={`w-full py-24 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} transition-colors duration-500 bg-gradient-to-b from-black/0 via-[#FF3838]/5 to-black/30 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,38,38,0.03)_1px,_transparent_1px)] bg-[size:100%_40px] pointer-events-none opacity-20" />
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
              Partner with Robotics Next and discover how advanced robotics and artificial intelligence can revolutionize your operations. Start your journey toward intelligent automation today.
            </p>

            <button 
              onClick={startChat}
              className="btn-premium px-10 py-4 rounded-xl shadow-2xl cursor-pointer"
            >
              Contact Our Experts
            </button>

          </div>
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section 
          id="contact-section"
          className={`w-full py-28 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} bg-black/20`}
        >
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column info */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <SectionTitle
                  text="CONTACT US"
                  className="mb-6"
                  triggerKey={triggerKey}
                />
                <BodyParagraph
                  text="We are ready to help you build the future with robotics and AI. Submit an online request or visit our core technology facility coordinates listed below."
                  className="mb-10 text-left !mx-0"
                  triggerKey={triggerKey}
                />                {/* Info block list */}
                <div className="space-y-6 w-full">
                  
                  {/* Phone & Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-[#FF3838] border border-white/10 mt-1">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="block text-[11px] font-mono tracking-widest text-gray-500 uppercase font-bold">CONTACT TELEPHONE</h3>
                      <span className="text-white text-md font-medium tracking-wide block mt-1">+2348168616393</span>
                      <a href="mailto:xlang.ai.agent@gmail.com" className="text-white text-md font-medium tracking-wide hover:text-cyan-400 transition-colors block mt-0.5">
                        xlang.ai.agent@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-emerald-400 border border-white/10 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="block text-[11px] font-mono tracking-widest text-gray-500 uppercase font-bold">FILE COORDINATES</h3>
                      <span className="text-white text-md font-light leading-relaxed block mt-1">
                        Innovation Technology Center<br />
                        Global Tech Park
                      </span>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg text-amber-500 border border-white/10 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="block text-[11px] font-mono tracking-widest text-gray-500 uppercase font-bold">BUSINESS</h3>
                      <span className="text-white text-md font-medium tracking-wide block mt-1">
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column message form */}
              <div className="lg:col-span-7">
                <div className={`p-8 rounded-xl border ${cardGlassClass}`}>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-6">
                    Route Message Protocol
                  </h3>

                  {formSubmitted ? (
                    <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                      <span className="text-lg font-bold text-emerald-400 block mb-2">PROTOCOL DEPLOYED</span>
                      <p className="text-xs text-gray-300">
                        Thank you! Your communication payload has been registered successfully. Our automation dispatch will initiate handshake routing within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 font-bold">
                          Client Entity / Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Dr. Michael Johnson"
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF3838] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 font-bold">
                          Digital Mail Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="e.g., m.johnson@corporate.com"
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF3838] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 font-bold">
                          Inquiry / Message Payload
                        </label>
                        <textarea 
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Describe your active mechanical requirements or deployment target specifications..."
                          className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#FF3838] transition-colors"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="btn-premium w-full py-4 rounded-lg cursor-pointer"
                      >
                        Transmit Payload Securely
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className={`w-full py-16 px-4 md:px-12 lg:px-16 border-t ${sectionBorderColor} leading-relaxed transition-colors duration-500 bg-black/60 relative z-10`}>
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Brand Col */}
              <div className="md:col-span-5 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4 select-none">
                  <Logo />
                  <span className="text-2xl text-3d">
                    ROBOTICS NEXT
                  </span>
                </div>
                <p className={`text-sm leading-relaxed font-light mb-6 opacity-85 max-w-sm text-gray-300`}>
                  Robotics Next is committed to advancing the future through intelligent robotics, artificial intelligence, and automation technologies.
                </p>
              </div>

              {/* Link Columns */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                
                {/* Quick Links */}
                <div>
                  <span className="footer-title block mb-4">Quick Links</span>
                  <ul className="space-y-3">
                    <li><button onClick={() => handleTabClick('Home')} className="footer-link cursor-pointer text-left">Home</button></li>
                    <li><button onClick={() => handleTabClick('About Us')} className="footer-link cursor-pointer text-left">About Us</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link cursor-pointer text-left">Services</button></li>
                    <li><button onClick={() => handleTabClick('Projects')} className="footer-link cursor-pointer text-left">Projects</button></li>
                    <li><button onClick={() => handleTabClick('Industries')} className="footer-link cursor-pointer text-left">Industries</button></li>
                    <li><button onClick={() => handleTabClick('Contact')} className="footer-link cursor-pointer text-left">Contact</button></li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <span className="footer-title block mb-4">Services</span>
                  <ul className="space-y-3">
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">Robotics Development</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">AI Solutions</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">Industrial Automation</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">Autonomous Systems</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">Consulting</button></li>
                    <li><button onClick={() => handleTabClick('Services')} className="footer-link text-left">Research & Innovation</button></li>
                  </ul>
                </div>

                {/* Newsletter Subscription */}
                <div>
                  <span className="footer-title block mb-3">Newsletter</span>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Subscribe to receive updates on robotics innovations, AI trends, and industry insights.
                  </p>
                  
                  {newsletterSubscribed ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[11px] text-emerald-400 font-mono">
                      SUBSCRIPTION_NOMINAL
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input 
                        type="email" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF3838] flex-1"
                      />
                      <button 
                        type="submit"
                        className="p-1.5 bg-white/10 text-white rounded hover:bg-[#FF3838] hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>

            {/* Bottom Row */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light tracking-wide text-gray-400">
              <p>
                &copy; 2026 Robotics Next. All Rights Reserved. Fully autonomous physical arrays.
              </p>
              
              <div className="flex gap-6">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer text-white font-mono text-[10px]"
                >
                  UP <span>↑</span>
                </button>
              </div>
            </div>

          </div>
        </footer>



        {/* ==================== INTERACTIVE SLIDE-OVER CHAT SYSTEM CONSOLE ==================== */}
        {chatOpen && (
          <div className="fixed inset-y-0 right-0 max-w-md w-full z-50 bg-black/95 backdrop-blur-xl border-l border-white/15 shadow-2xl flex flex-col justify-between">
            {/* Chat Header */}
            <div className="p-5 border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold font-mono tracking-widest text-white uppercase">
                  ROBOTICS NEXT CORE_NET
                </span>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-1 rounded bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[9px] font-mono text-gray-500 uppercase mb-1">
                    {msg.sender === 'user' ? 'CLIENT_INJECT' : 'ROBTX_CORE'}
                  </span>
                  <div className={`p-3.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF3838] text-white rounded-tr-none'
                      : 'bg-white/10 text-gray-100 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/15 bg-black/60 flex items-center gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Transmitting diagnostic query payload..."
                className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3838] transition-colors"
              />
              <button 
                type="submit"
                className="p-3 bg-[#FF3838] hover:bg-[#D32F2F] text-white rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

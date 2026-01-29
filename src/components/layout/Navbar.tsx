"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'experience'>('about');
    const [scrolled, setScrolled] = useState(false);

    // Antigravity: Hide checks
    const pathname = usePathname();
    const isHidden = pathname.startsWith('/admin') || pathname === '/login';

    useEffect(() => {
        if (isHidden) return;
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsOpen(false);
        // Small timeout to allow the menu to begin closing/DOM to settle before scrolling
        // This prevents scroll interruptions on mobile devices
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150);
    };

    if (isHidden) return null;

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#home"
                            className="text-2xl font-bold tracking-tighter hover:scale-105 transition-transform duration-300 block cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setIsOpen(false);
                            }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">Durjoy Barua</span>
                            <span className="text-primary text-3xl">.</span>
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href.substring(1));
                                    }}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <Button variant="primary" size="sm" onClick={() => scrollToSection('contact')}>
                            Contact Me
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden relative z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none touch-manipulation cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="md:hidden absolute top-[calc(100%+12px)] right-4 w-64 glass-card rounded-2xl border border-white/10 shadow-3xl overflow-hidden z-[60]"
                    >
                        <div className="p-4 space-y-1 flex flex-col">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        scrollToSection(item.href.substring(1));
                                    }}
                                    className="block text-foreground/70 hover:text-primary hover:bg-white/5 px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer active:scale-95"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <div className="pt-2">
                                <Button
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollToSection('contact');
                                    }}
                                >
                                    Contact Me
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

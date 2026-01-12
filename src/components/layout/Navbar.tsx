"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Optional: Update URL hash without scroll jump
            window.history.pushState({}, '', href);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/50 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="#home"
                            onClick={(e) => handleNavClick(e, '#home')}
                            className="text-2xl font-bold tracking-tighter hover:scale-105 transition-transform duration-300 block"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">Durjoy Barua</span>
                            <span className="text-primary text-3xl">.</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <Button variant="primary" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0A0B14] border-b border-white/10 overflow-hidden absolute w-full"
                    >
                        <div className="px-5 pt-4 pb-8 space-y-4 flex flex-col">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => { setIsOpen(false); handleNavClick(e, item.href); }}
                                    className="text-foreground/80 hover:text-primary text-lg font-medium transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4">
                                <Button className="w-full" onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Me</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

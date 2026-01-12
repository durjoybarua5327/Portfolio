"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
    return (
        <Section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Particles/Glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center w-full">

                {/* Left Column: Text */}
                <div className="flex flex-col items-start text-left">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary-foreground/80 text-white">Software Developer • Web & Mobile Specialist</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">digital</span> experiences with precision.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
                    >
                        Hi, I&apos;m Durjoy Barua — a Software Developer specializing in React, React Native, and Flutter. I build scalable, performant web and mobile applications using Next.js, Express, MySQL, and MongoDB.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 group">
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> Download CV
                        </Button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex gap-6"
                    >
                        {[Github, Linkedin, Twitter].map((Icon, idx) => (
                            <a key={idx} href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Icon size={20} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Image Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mx-auto md:ml-auto w-full max-w-md aspect-[3/4]"
                >
                    {/* Glowing Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 transfom translate-y-4" />

                    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0F111A] shadow-2xl group">
                        {/* Mock Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent z-10" />
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                            {/* This is where the user image would go. Using a gradient placeholder for now. */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
                            <span className="text-slate-700 font-bold text-9xl select-none z-0">DB</span>

                            {/* Overlay Content on Image */}
                            <div className="absolute top-4 left-4 z-20">
                                <div className="glass px-4 py-2 rounded-xl flex flex-col items-center border-l-4 border-l-primary/80">
                                    <span className="text-2xl font-bold text-white">5+</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400">Years Exp.</span>
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 z-20">
                                <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border border-primary/20 bg-black/40">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-white">Available for work</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tech Stack Marquee (Static for now as per image bottom part) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 pt-10 border-t border-white/5 w-full overflow-hidden"
            >
                <p className="text-center text-sm text-muted-foreground mb-8">Technologies I work with</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {['React', 'React Native', 'Flutter', 'Next.js', 'Express', 'MySQL', 'MongoDB', 'Tailwind'].map(tech => (
                        <span key={tech} className="text-lg font-semibold hover:text-primary transition-colors cursor-default">{tech}</span>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}

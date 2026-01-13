"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import Spline from '@splinetool/react-spline';

export default function Hero() {
    return (
        <Section id="home" className="pt-4 pb-6 md:pt-20 md:pb-16 overflow-hidden">
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
                        className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary-foreground/80 text-white">Software Developer • Web & Mobile Specialist</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight"
                    >
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">digital</span> experiences with precision.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
                    >
                        Hi, I&apos;m Durjoy Barua — a Software Developer specializing in React, React Native, and Flutter. I build scalable, performant web and mobile applications using Next.js, Express, MySQL, and MongoDB.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto h-11" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="lg" className="w-full sm:w-auto h-11 gap-2 group">
                            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> Download CV
                        </Button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex gap-6"
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
                    className="relative mx-auto md:ml-auto w-full max-w-lg h-[500px] md:h-[600px]"
                >
                    {/* Glowing Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 transfom translate-y-4" />

                    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-transparent group">
                        {/* 3D Character Container */}
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                src='https://my.spline.design/genkubgreetingrobot-iK04YtppWNdQZkB3OJUGbYO6/'
                                frameBorder='0'
                                width='100%'
                                height='100%'
                                className="w-full h-full pointer-events-auto"
                                title="3D Robot"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            </div>

        </Section>
    );
}

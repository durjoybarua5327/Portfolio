"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
    return (
        <Section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 delay-1000 animate-pulse" />
            </div>

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 p-1 rounded-full bg-gradient-to-r from-primary to-blue-500"
                >
                    <div className="bg-background rounded-full px-4 py-1 text-sm font-medium">
                        Available for hire
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    Building <span className="text-primary">Digital Experiences</span> that Matter.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
                >
                    I&apos;m a Full Stack Developer passionate about building accessible, pixel-perfect, and performant web applications using Next.js and Supabase.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Projects <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                        Download Resume <Download className="ml-2 w-4 h-4" />
                    </Button>
                </motion.div>
            </div>
        </Section>
    );
}

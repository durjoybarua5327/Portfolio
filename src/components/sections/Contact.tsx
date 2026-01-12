"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

export default function Contact() {
    return (
        <Section id="contact" className="pb-32">
            <div className="max-w-2xl mx-auto w-full text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold mb-6"
                >
                    Get In Touch
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-muted-foreground mb-12"
                >
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 rounded-2xl mb-12"
                >
                    <div className="grid gap-6">
                        <Button size="lg" className="w-full text-lg h-14" onClick={() => window.location.href = 'mailto:hello@example.com'}>
                            <Mail className="mr-2" /> Say Hello
                        </Button>
                    </div>
                </motion.div>

                <div className="flex justify-center gap-6">
                    {[
                        { icon: Github, href: "https://github.com" },
                        { icon: Linkedin, href: "https://linkedin.com" },
                        { icon: Twitter, href: "https://twitter.com" }
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary transition-all hover:scale-110 border border-white/5"
                        >
                            <social.icon size={24} />
                        </motion.a>
                    ))}
                </div>
            </div>

            <footer className="mt-20 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} My Portfolio. Built with Next.js & Tailwind.</p>
            </footer>
        </Section>
    );
}

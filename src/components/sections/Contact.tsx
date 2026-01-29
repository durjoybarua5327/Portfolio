"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";

import { ContactSettings } from "@/types";

import { supabase } from "@/lib/supabase";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact({ contact }: { contact?: ContactSettings }) {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            const { error } = await supabase.from('messages').insert([
                {
                    name: formState.name,
                    email: formState.email,
                    message: formState.message
                }
            ]);

            if (error) throw error;

            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000); // Clear success after 5s
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section id="contact" className="!pt-10 !pb-20 !min-h-fit overflow-hidden relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Get In Touch
                </h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </motion.div>

            <div className="max-w-xl 3xl:max-w-2xl 4xl:max-w-4xl mx-auto w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="relative glass-card p-5 md:p-8 rounded-3xl border border-white/10 bg-background/50 backdrop-blur-xl shadow-2xl">
                        <div className="space-y-4">
                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-sm font-medium ml-1 text-muted-foreground">Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-sm"
                                        placeholder="Your name"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-sm font-medium ml-1 text-muted-foreground">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium text-sm"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-sm font-medium ml-1 text-muted-foreground">Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-muted-foreground/50" size={16} />
                                    <textarea
                                        id="message"
                                        required
                                        rows={3}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-medium text-sm"
                                        placeholder="How can I help you?"
                                    />
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-10 text-sm font-bold mt-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 transform active:scale-95 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Message <Send className="ml-2" size={16} />
                                    </>
                                )}
                            </Button>

                            {/* Success / Error Messages */}
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 p-3 rounded-xl text-sm font-medium mt-2"
                                >
                                    <CheckCircle2 size={18} />
                                    Message sent successfully! I'll get back to you soon.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-sm font-medium mt-2"
                                >
                                    <AlertCircle size={18} />
                                    {errorMessage}
                                </motion.div>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* Social Links from DB */}
                {contact && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex justify-center gap-6 mt-10"
                    >
                        {contact.github_url && (
                            <a href={contact.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                                <Github size={24} />
                            </a>
                        )}
                        {contact.linkedin_url && (
                            <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </a>
                        )}
                        {contact.twitter_url && (
                            <a href={contact.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                                <Twitter size={24} />
                            </a>
                        )}
                    </motion.div>
                )}

            </div>
        </Section>
    );
}

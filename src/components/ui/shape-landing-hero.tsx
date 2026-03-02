"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
            animate={{ opacity: 1, y: 0, rotate: rotate }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            style={{ position: 'absolute' }}
            className={className}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width, height, position: 'relative' }}
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    description,
    children,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    children?: React.ReactNode;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] },
        }),
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Floating shapes */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <ElegantShape delay={0.3} width={600} height={140} rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
                <ElegantShape delay={0.5} width={500} height={120} rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
                <ElegantShape delay={0.4} width={300} height={80} rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
                <ElegantShape delay={0.6} width={200} height={60} rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
                <ElegantShape delay={0.7} width={150} height={40} rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
            </div>

            {/* Centered content — all inline styles to prevent CSS conflicts */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: 900,
                margin: '0 auto',
                padding: '0 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* Badge */}
                <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '6px 16px', borderRadius: 9999,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        marginBottom: 48,
                    }}>
                    <Circle style={{ width: 8, height: 8, fill: 'rgba(244,63,94,0.8)', color: 'transparent' }} />
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
                        {badge}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible"
                    style={{ width: '100%', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                        fontWeight: 800,
                        marginBottom: 32,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        fontFamily: "'Nunito', sans-serif",
                    }}>
                        <span style={{
                            backgroundImage: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.8))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            display: 'block',
                        }}>
                            {title1}
                        </span>
                        <span style={{
                            backgroundImage: 'linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #fda4af)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            display: 'block',
                        }}>
                            {title2}
                        </span>
                    </h1>
                </motion.div>

                {/* Description */}
                {description && (
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible"
                        style={{ width: '100%', textAlign: 'center' }}>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: 'rgba(255,255,255,0.4)',
                            marginBottom: 32,
                            lineHeight: 1.7,
                            fontWeight: 300,
                            letterSpacing: '0.02em',
                            maxWidth: 560,
                            margin: '0 auto 32px auto',
                        }}>
                            {description}
                        </p>
                    </motion.div>
                )}

                {/* Children (CTA buttons) */}
                {children && (
                    <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {children}
                    </motion.div>
                )}
            </div>

            {/* Subtle vignette overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)',
            }} />
        </div>
    );
}

export { HeroGeometric };

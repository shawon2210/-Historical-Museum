import { motion } from "motion/react";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export const fadeUpStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

export function PageHero({ badge, title, subtitle, dark = false, children }: {
  badge: string;
  title: string;
  subtitle: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  const bg = dark ? "#0a0a0a" : "#fcfcfc";
  const textColor = dark ? "#f5f5f0" : "#1a1a1a";
  const subColor = dark ? "#d0d0d0" : "#4a4a4a";
  const badgeColor = dark ? "#6a6a62" : "#8a8a8a";

  return (
    <section style={{ backgroundColor: bg, paddingTop: 120, paddingBottom: 80, overflow: "hidden" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: badgeColor }}>{badge}</span>
          <div style={{ width: 48, height: 1, backgroundColor: badgeColor, opacity: 0.4 }} />
        </motion.div>

        <motion.h1
          className="font-normal tracking-tight mb-6"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1.1, color: textColor }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-base leading-relaxed mb-10 max-w-[600px]"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.125rem)", lineHeight: 1.6, color: subColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {subtitle}
        </motion.p>

        {children}
      </div>
    </section>
  );
}

export function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div
      className="text-xs font-mono tracking-widest mb-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <span style={{ color: dark ? "#6a6a62" : "#8a8a8a" }}>{children}</span>
    </motion.div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-20">
      <p className="text-lg font-medium mb-2" style={{ color: "#1a1a1a" }}>{title}</p>
      <p className="text-sm" style={{ color: "#8a8a8a" }}>{description}</p>
    </div>
  );
}

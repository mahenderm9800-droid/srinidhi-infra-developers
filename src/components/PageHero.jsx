import React from 'react';
import { motion } from 'framer-motion';

/**
 * Shared premium page hero used across the inner sections of the site.
 * Keeps banner styling, spacing and typography consistent everywhere.
 */
const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  align = 'center',
  children
}) => {
  const alignment =
    align === 'left'
      ? 'text-center md:text-left items-center md:items-start'
      : 'text-center items-center';

  return (
    <section className="relative pt-36 pb-24 text-white overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-105 opacity-40"
            loading="eager"
          />
        )}
        <div className="hero-veil" />
        <div className="absolute inset-0 hero-lines opacity-60" />
        <div className="glow-blob w-[520px] h-[520px] bg-accent-500/30 -top-40 -left-24" />
        <div className="glow-blob w-[420px] h-[420px] bg-emerald-400/20 -bottom-32 right-0" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignment}`}
      >
        {eyebrow && <span className="section-eyebrow-light mb-5">{eyebrow}</span>}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight max-w-4xl">
          {title}
        </h1>
        <div className={`accent-rule mt-6 ${align === 'center' ? 'mx-auto' : 'mx-auto md:mx-0'}`} />
        {description && (
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-6 leading-relaxed font-light">
            {description}
          </p>
        )}
        {children && <div className="mt-8 w-full">{children}</div>}
      </motion.div>
    </section>
  );
};

export default PageHero;

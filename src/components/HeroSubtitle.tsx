import React from 'react';

interface HeroSubtitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerKey?: number | string;
}

export default function HeroSubtitle({ text, className = '', style = {}, triggerKey = 0 }: HeroSubtitleProps) {
  const combinedStyles: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 1.7,
    letterSpacing: '0.3px',
    ...style
  };

  return (
    <p
      key={triggerKey}
      className={`animate-fade-up-subtitle text-[17px] sm:text-[21px] md:text-[23px] lg:text-[26px] max-w-[800px] mx-auto w-full text-center ${className}`}
      style={combinedStyles}
    >
      {text}
    </p>
  );
}

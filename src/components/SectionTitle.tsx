import React from 'react';

interface SectionTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerKey?: number | string;
}

export default function SectionTitle({ text, className = '', style = {}, triggerKey = 0 }: SectionTitleProps) {
  // Convert text to uppercase as requested
  const uppercaseText = text.toUpperCase();

  const combinedStyles: React.CSSProperties = {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 800,
    color: '#FFFFFF',
    textShadow: '0px 2px 12px rgba(0, 212, 255, 0.2)',
    lineHeight: 1.1,
    letterSpacing: '-1px',
    ...style
  };

  return (
    <h2
      key={triggerKey}
      className={`animate-fade-up-title text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] uppercase ${className}`}
      style={combinedStyles}
    >
      {uppercaseText}
    </h2>
  );
}

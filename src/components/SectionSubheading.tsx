import React from 'react';

interface SectionSubheadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerKey?: number | string;
}

export default function SectionSubheading({ text, className = '', style = {}, triggerKey = 0 }: SectionSubheadingProps) {
  const combinedStyles: React.CSSProperties = {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.3,
    letterSpacing: '-0.5px',
    ...style
  };

  return (
    <h3
      key={triggerKey}
      className={`animate-fade-up-subheading text-[22px] md:text-[26px] lg:text-[30px] xl:text-[34px] ${className}`}
      style={combinedStyles}
    >
      {text}
    </h3>
  );
}

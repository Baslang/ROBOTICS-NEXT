import React from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerKey?: number | string; // Allows resetting the transition on state changes (e.g. toggles, replays)
}

export default function AnimatedHeading({ text, className = '', style = {}, triggerKey = 0 }: AnimatedHeadingProps) {
  // Convert text to uppercase as requested
  const uppercaseText = text.toUpperCase();

  // Combine standard styling attributes for the ultimate Premium Robotics design
  const combinedStyles: React.CSSProperties = {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 900,
    color: '#FFFFFF',
    textShadow: '0px 4px 20px rgba(0, 212, 255, 0.3)',
    lineHeight: 1.05,
    ...style
  };

  return (
    <h1 
      key={triggerKey}
      className={`animate-fade-up-scale text-[40px] md:text-[56px] lg:text-[72px] xl:text-[88px] tracking-[-2px] md:tracking-[-2.5px] xl:tracking-[-3px] uppercase max-w-[1020px] mx-auto w-full text-center ${className}`}
      style={combinedStyles}
    >
      {uppercaseText}
    </h1>
  );
}

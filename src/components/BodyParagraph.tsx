import React from 'react';

interface BodyParagraphProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerKey?: number | string;
}

export default function BodyParagraph({ text, className = '', style = {}, triggerKey = 0 }: BodyParagraphProps) {
  const combinedStyles: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 400,
    color: '#CBD5E1',
    lineHeight: 1.8,
    letterSpacing: '0.2px',
    maxWidth: '850px',
    ...style
  };

  return (
    <p
      key={triggerKey}
      className={`animate-fade-up-paragraph text-[16px] md:text-[17px] lg:text-[18px] xl:text-[20px] mx-auto w-full font-sans font-normal leading-[1.8] tracking-[0.2px] text-[#CBD5E1] ${className}`}
      style={combinedStyles}
    >
      {text}
    </p>
  );
}


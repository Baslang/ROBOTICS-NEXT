import React from 'react';

interface StatisticLabelProps {
  text: string;
  className?: string;
}

export default function StatisticLabel({ text, className = '' }: StatisticLabelProps) {
  const style: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    color: '#CBD5E1',
  };

  return (
    <span
      className={`text-[18px] sm:text-[20px] md:text-[22px] tracking-wide uppercase block ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}

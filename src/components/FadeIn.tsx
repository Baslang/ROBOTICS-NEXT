import React, { useState, useEffect } from 'react';

interface FadeInProps {
  delay: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({ delay, duration = 1000, children, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

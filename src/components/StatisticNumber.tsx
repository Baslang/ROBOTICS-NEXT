import React, { useEffect, useState, useRef } from 'react';

interface StatisticNumberProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

export default function StatisticNumber({ value, suffix = '', decimals = 0 }: StatisticNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // 1.2 seconds animation for beautiful smooth count-up

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic formula for natural mechanical physics deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        prevValueRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formatted = displayValue.toFixed(decimals);

  const style: React.CSSProperties = {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 900,
    color: '#00D4FF',
    textShadow: '0px 0px 25px rgba(0, 212, 255, 0.5)',
  };

  return (
    <div
      className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[76px] tracking-tight leading-none mt-3"
      style={style}
    >
      {formatted}{suffix}
    </div>
  );
}

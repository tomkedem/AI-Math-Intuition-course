"use client";

import React, { useMemo, useRef } from 'react';

type TiltAxis = 'x' | 'y' | null;

export interface TiltOptions {
  reverse?: boolean;
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  transition?: boolean;
  axis?: TiltAxis;
  reset?: boolean;
  easing?: string;
}

export interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: TiltOptions;
  children: React.ReactNode;
}

export const Tilt: React.FC<TiltProps> = ({
  options,
  className,
  style,
  children,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const settings = useMemo<TiltOptions>(
    () => ({
      reverse: false,
      max: 15,
      perspective: 1000,
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      reset: true,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      ...options,
    }),
    [options]
  );

  const applyTransform = (rotateX: number, rotateY: number) => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${settings.scale})`;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const direction = settings.reverse ? -1 : 1;
      let rotateX = direction * settings.max! * (-y * 2);
      let rotateY = direction * settings.max! * (x * 2);

      if (settings.axis === 'x') {
        rotateY = 0;
      }

      if (settings.axis === 'y') {
        rotateX = 0;
      }

      if (settings.transition) {
        containerRef.current!.style.transition = 'transform 100ms ease-out';
      }

      applyTransform(rotateX, rotateY);
    });

    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    if (settings.transition) {
      containerRef.current.style.transition = `transform ${settings.speed}ms ${settings.easing}`;
    }

    if (settings.reset) {
      applyTransform(0, 0);
    }

    onMouseLeave?.(event);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (settings.transition && containerRef.current) {
      containerRef.current.style.transition = 'transform 150ms ease-out';
    }
    onMouseEnter?.(event);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      {children}
    </div>
  );
};

Tilt.displayName = 'Tilt';

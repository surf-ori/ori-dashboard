"use client";

import React from 'react';
import surfLogoSvg from '@/assets/surf-logo.svg';
import surfLogoWhiteSvg from '@/assets/surf-logo-white.svg';

interface SurfLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export function SurfLogo({ variant = 'light', className = '', showText = true }: SurfLogoProps) {
  const logoSrc = variant === 'dark' ? surfLogoWhiteSvg : surfLogoSvg;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoSrc} 
        alt="SURF" 
        className="h-8 w-auto"
      />
      {showText && (
        <div className="border-l border-sidebar-border pl-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/60 font-semibold">ORI</p>
          <h2 className="font-display font-extrabold text-sm text-sidebar-foreground leading-tight">Quality Dashboard</h2>
        </div>
      )}
    </div>
  );
}

export default SurfLogo;
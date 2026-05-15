"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SurfCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function SurfCard({ children, className, variant = 'default', padding = 'md' }: SurfCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    default: 'bg-card border border-border',
    elevated: 'bg-card border border-border shadow-md',
    outlined: 'bg-card border-2 border-primary/20',
  };

  return (
    <div className={cn(
      'rounded-xl',
      variantClasses[variant],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

export default SurfCard;
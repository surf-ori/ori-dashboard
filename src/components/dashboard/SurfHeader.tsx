"use client";

import React from 'react';
import { SurfLogo } from '@/components/ui/SurfLogo';
import { Bell, User, Settings } from '@/lib/surf-icons';
import { cn } from '@/lib/utils';

interface SurfHeaderProps {
  className?: string;
  showSidebarTrigger?: boolean;
  onSidebarTriggerClick?: () => void;
}

export function SurfHeader({ className, showSidebarTrigger = true, onSidebarTriggerClick }: SurfHeaderProps) {
  return (
    <header className={cn('sticky top-0 z-10 h-14 flex items-center gap-4 border-b bg-background/95 backdrop-blur px-4', className)}>
      {showSidebarTrigger && (
        <button
          onClick={onSidebarTriggerClick}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}
      
      <div className="flex-1 flex items-center justify-between">
        <SurfLogo variant="light" showText={false} className="h-8" />
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="User menu">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default SurfHeader;
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * SURF Design System Theme Configuration
 * Based on https://github.com/surf-ori/surf-design-system
 */
export const SURF_THEME = {
  colors: {
    primary: {
      DEFAULT: 'hsl(30, 100%, 45%)', // SURF Orange #E67300
      foreground: 'hsl(0, 0%, 100%)',
      '700': 'hsl(30, 100%, 36%)',
      '050': 'hsl(30, 100%, 95%)',
    },
    accent: {
      DEFAULT: 'hsl(203, 100%, 38%)', // SURF Blue #0077C0
      foreground: 'hsl(0, 0%, 100%)',
    },
    destructive: {
      DEFAULT: 'hsl(4, 73%, 51%)', // SURF Red #DF3226
      foreground: 'hsl(0, 0%, 100%)',
    },
    success: {
      DEFAULT: 'hsl(146, 100%, 27%)', // SURF Green #008942
      foreground: 'hsl(0, 0%, 100%)',
    },
    warning: {
      DEFAULT: 'hsl(30, 100%, 45%)', // Reuse orange
      foreground: 'hsl(0, 0%, 100%)',
    },
    info: {
      DEFAULT: 'hsl(203, 100%, 38%)', // Reuse blue
      foreground: 'hsl(0, 0%, 100%)',
    },
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(0, 0%, 4%)',
    card: {
      DEFAULT: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 4%)',
    },
    popover: {
      DEFAULT: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 4%)',
    },
    secondary: {
      DEFAULT: 'hsl(0, 0%, 96%)',
      foreground: 'hsl(0, 0%, 4%)',
    },
    muted: {
      DEFAULT: 'hsl(0, 0%, 96%)',
      foreground: 'hsl(0, 0%, 32%)',
    },
    border: 'hsl(0, 0%, 85%)',
    input: 'hsl(0, 0%, 85%)',
    ring: 'hsl(30, 100%, 45%)',
  },
  
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  
  fontFamily: {
    display: ['Nunito', 'system-ui', 'sans-serif'],
    sans: ['Source Sans 3', 'Source Sans Pro', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
} as const;

export type SurfTheme = typeof SURF_THEME;

/**
 * SURF Basiskader component class
 * The signature thick black rounded frame
 */
export const basiskader = 'border-4 border-solid border-[hsl(var(--foreground))] rounded-[32px]';

/**
 * SURF Eyebrow text style
 * Small orange uppercase label for headings
 */
export const eyebrow = 'text-xs font-semibold uppercase tracking-[0.08em] text-primary';

/**
 * SURF Focus ring utility
 */
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

/**
 * SURF Transition utilities
 */
export const transition = 'transition-all duration-200 ease-in-out';
export const transitionFast = 'transition-all duration-150 ease-in-out';
export const transitionSlow = 'transition-all duration-300 ease-in-out';
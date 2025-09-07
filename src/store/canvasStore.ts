import { create } from 'zustand';

export interface CanvasState {
  // Animation mode states
  isTransitioning: boolean;
  activeSection: string | null;
  mode: 'canvas' | 'section';
  
  // GSAP Flip state management
  flipState: any | null;
  
  // Section-specific animation patterns
  sectionAnimationConfig: {
    [key: string]: {
      titlePosition: 'top-left' | 'center' | 'left' | 'in-place';
      contentReveal: 'timeline' | 'tiles' | 'slideshow' | 'none';
      animationDuration: number;
    }
  };

  // Actions
  setTransitioning: (isTransitioning: boolean) => void;
  setActiveSection: (section: string | null) => void;
  setMode: (mode: 'canvas' | 'section') => void;
  setFlipState: (state: any) => void;
  clearFlipState: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  // Initial state
  isTransitioning: false,
  activeSection: null,
  mode: 'canvas',
  flipState: null,
  
  // Section-specific animation configurations
  sectionAnimationConfig: {
    biography: {
      titlePosition: 'top-left',
      contentReveal: 'timeline',
      animationDuration: 0.8,
    },
    recordings: {
      titlePosition: 'center',
      contentReveal: 'tiles',
      animationDuration: 0.8,
    },
    masterclasses: {
      titlePosition: 'left',
      contentReveal: 'tiles',
      animationDuration: 0.8,
    },
    philanthropy: {
      titlePosition: 'in-place',
      contentReveal: 'slideshow',
      animationDuration: 0.8,
    },
  },

  // Actions
  setTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
  setActiveSection: (section: string | null) => set({ activeSection: section }),
  setMode: (mode: 'canvas' | 'section') => set({ mode }),
  setFlipState: (state: any) => set({ flipState: state }),
  clearFlipState: () => set({ flipState: null }),
}));
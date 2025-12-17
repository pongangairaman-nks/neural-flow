import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  const saved = localStorage.getItem('app-theme');
  if (saved) return saved;
  
  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return 'light';
};

export const useUIStore = create(
  persist(
    (set) => ({
      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Theme state
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update DOM
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        // Update DOM
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },

      // Body top panel state
      bodyTopPanelOpen: true,
      toggleBodyTopPanel: () =>
        set((state) => ({ bodyTopPanelOpen: !state.bodyTopPanelOpen })),
      setBodyTopPanelOpen: (open) => set({ bodyTopPanelOpen: open }),

      // Canvas state
      selectedNodeId: null,
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      canvasZoom: 1,
      setCanvasZoom: (zoom) => set({ canvasZoom: zoom }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        bodyTopPanelOpen: state.bodyTopPanelOpen,
      }),
    }
  )
);

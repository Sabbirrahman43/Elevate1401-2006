import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cast process to any to resolve TS error: Property 'cwd' does not exist on type 'Process'
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // IMPORTANT: This ensures assets load correctly when deployed to a subdirectory (like on GitHub Pages)
    base: './', 
    define: {
      // This injects the Netlify/System Environment Variable into the React App at build time.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || "")
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
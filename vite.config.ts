import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // Restore path import
import { componentTagger } from "lovable-tagger";
import vike from 'vike/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    vike(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  // Restore the resolve.alias section
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

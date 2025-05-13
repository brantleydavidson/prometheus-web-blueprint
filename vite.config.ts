import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import path from "path"; // No longer needed for alias
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
  // Remove the resolve.alias section for testing
  /*
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  */
}));

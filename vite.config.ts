import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import react from "@vitejs/plugin-react"
import path from "path"
import { ViteMinifyPlugin } from "vite-plugin-minify"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr({
    // export svg as component as a default config 
      exportAsDefault: true
    }),
    ViteMinifyPlugin({})
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src"), }, }
})
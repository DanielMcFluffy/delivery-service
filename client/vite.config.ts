import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDotenv } from 'dotenv';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

//define the env file path
configDotenv({path: ".././config/config.env"})  
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(), //setup tanstack router vite plugin for route regeneration
  ],
  //setup env
  define: {
    'process.env': process.env
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':{
        /* target:'http://localhost:3001',  local DB connection*/
        target:'https://taskflow-backend-4bpf.onrender.com',
        changeOrigin:true
      }
    }
  }
})

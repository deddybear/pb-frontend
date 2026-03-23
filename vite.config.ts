import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            external: [
                '/src/files/'
            ],
            output: {
                entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
                chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
                assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`
            }
        }
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    ['babel-plugin-react-compiler']
                ],
            },
        }),
        tailwindcss(),
    ],
})

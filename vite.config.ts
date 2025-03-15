import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-antd': ['antd'],
                    'vendor-utils': ['@supabase/supabase-js', 'axios', 'dayjs'],
                },
                assetFileNames: (
                    assetInfo: { name?: string } | undefined
                ): string => {
                    const info = assetInfo?.name ?? ''
                    if (info.endsWith('.woff2')) {
                        return 'assets/fonts/[name]-[hash][extname]'
                    }
                    if (info.endsWith('.png') || info.endsWith('.jpg')) {
                        return 'assets/images/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'antd'],
    },
})

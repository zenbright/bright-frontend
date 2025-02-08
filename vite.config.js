// vite.config.js
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@features': path.resolve(__dirname, './src/features'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@test': path.resolve(__dirname, './src/test'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
    server: {
        host: '0.0.0.0',
    },
    build: {
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            external: ['@faker-js/faker'], // mark faker as external
            output: {
                globals: {
                    '@faker-js/faker': 'faker'
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const match = id.match(/node_modules\/(?:\.pnpm\/)?([^\/]+)/);
                        if (match) {
                            let pkgName = match[1];
                            // If scoped package, remove version info and fix delimiter from PNPM
                            if (pkgName.startsWith('@')) {
                                // Split by '@' yields ["", "faker-js_faker", "9.4.0-BK-y1tDw"]
                                const segs = pkgName.split('@');
                                // Reconstruct the package name (replace '_' with '/' for scoped packages)
                                pkgName = `@${segs[1]}`.replace('_', '/');
                            } else {
                                // For non-scoped packages, remove version info if present
                                pkgName = pkgName.split('@')[0];
                            }
                            return `vendor-${pkgName}`;
                        }
                        return 'vendor-other';
                    }
                },
            },
        },
    },
});

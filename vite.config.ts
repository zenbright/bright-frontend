import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), svgr(), tailwindcss(), tsconfigPaths()],
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
    server: {
        host: '0.0.0.0',
    },
    build: {
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            external: ['@faker-js/faker'],
            output: {
                globals: {
                    '@faker-js/faker': 'faker',
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const match = id.match(/node_modules\/(?:\.pnpm\/)?([^\/]+)/);
                        if (match) {
                            let pkgName = match[1];
                            if (pkgName.startsWith('@')) {
                                const segs = pkgName.split('@');
                                pkgName = `@${segs[1]}`.replace('_', '/');
                            } else {
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

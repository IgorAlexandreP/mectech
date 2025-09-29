import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Content Security Policy
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://sistema.mectechequipamentos.com.br https://fonts.googleapis.com https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
      // Prevenir clickjacking
      'X-Frame-Options': 'DENY',
      // Prevenir MIME sniffing
      'X-Content-Type-Options': 'nosniff',
      // Política de referrer
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Prevenir XSS
      'X-XSS-Protection': '1; mode=block',
      // Permissões
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      // HSTS (apenas em produção com HTTPS)
      ...(mode === 'production' && {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
      })
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configurações de build para produção
  build: {
    // Minificar código
    minify: 'terser',
    // Configurações do Terser para segurança
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    // Configurações de rollup para segurança
    rollupOptions: {
      output: {
        // Separar chunks para melhor cache
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
}));

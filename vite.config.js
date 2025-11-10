import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler'],],
      },
    }),tailwindcss()
  ],
   test: {
    // 🔹 Basic setup
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',

    // 🔹 Stability settings (Windows-safe)
    threads: false,          // Disable worker_threads completely
    pool: 'forks',           // Use child process pool instead
    isolate: false,          // Prevents re-isolation per test file (faster + safer on Windows)

    // 🔹 Timeout & performance
    testTimeout: 20000,      // 20s per test (avoid slow jsdom startup)
    hookTimeout: 20000,
    teardownTimeout: 20000,

    // 🔹 Pool options
    poolOptions: {
      forks: {
        singleFork: true,    // Run all tests in a single process
      },
    },
  },
})

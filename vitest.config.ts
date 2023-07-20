import { defineConfig } from 'vitest/config'

export default defineConfig({
    optimizeDeps: {
        entries: [],
    },
    test: {
        coverage: {
            reporter: ['lcov']
        },
    }
})
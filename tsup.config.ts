import { defineConfig } from 'tsup'

export default defineConfig({
    entry:[
        './src/**/*.ts'
    ],
    format: 'esm',
    outDir: './dist',
    clean: true,
    target: 'node20',
    splitting: false,
    minify: true
})
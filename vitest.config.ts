import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    dir: 'app',
    environment: 'happy-dom',
    css: false, // disabling CSS features like media queries
  },
  plugins: [tsconfigPaths()],
});

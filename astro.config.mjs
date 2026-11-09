// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-jdmm.vercel.app',
  // The certificates page was retired; keep old shared links working.
  redirects: {
    '/certificaciones': '/',
  },
});

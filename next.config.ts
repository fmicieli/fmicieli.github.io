import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (fmicieli.github.io) — no server, no
  // API routes/middleware/server actions anywhere in this app, so this is
  // a straight switch. Served from the domain root (this repo IS the
  // special `<user>.github.io` user-page repo), so no basePath is needed —
  // every hardcoded `/projects/...` asset path in data/projects.ts and
  // components keeps working unmodified.
  output: "export",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
experimental:{
  ppr:'incremental'
},
devIndicators:{
  position: 'bottom-left'
}
};

export default nextConfig;

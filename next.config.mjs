/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
      { protocol: 'https', hostname: 'images.higgs.ai' },
    ],
    formats: ['image/webp'],
  },
  env: {
    NEXT_PUBLIC_BRAPI_TOKEN: process.env.BRAPI_TOKEN || '',
    NEXT_PUBLIC_NEWSAPI_KEY: process.env.NEWSAPI_KEY || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

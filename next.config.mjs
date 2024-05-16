/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "one-taste.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "t1.kakaocdn.net"
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
};

export default nextConfig;

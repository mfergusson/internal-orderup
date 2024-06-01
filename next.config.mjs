/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['antd', 'rc-util', 'rc-pagination', 'rc-picker', '@ant-design'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/image-approval',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

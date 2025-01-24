/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // output: 'export',
    // distDir: './dist', // Changes the build output directory to `./dist/`.
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/**',
            },
            // {
            //     protocol: 'https',
            //     hostname: 'back-end.spoon.ph',
            //     pathname: '/storage/**',
            // },
        ],
    },
};

export default nextConfig;

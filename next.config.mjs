/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fastly.4sqi.net',
                port: '',
                pathname: '/img/general/**',
            },
            {
                protocol: 'https',
                hostname: 'places.googleapis.com',
                port: '',
                pathname: '/v1/places/**',
            },
            {
                protocol: 'https',
                hostname: 'npmbtmwoiduabcvzgvsk.supabase.co',
                port: '',
                pathname: '/storage/v1/object/**',
            },
        ],
    },
}

export default nextConfig

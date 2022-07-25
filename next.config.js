const path = require('path')

module.exports = {
    images: {
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['images.prismic.io'],
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    swcMinify: true,
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@components': path.join(__dirname, 'components'),
            '@lib': path.join(__dirname, 'lib'),
        }

        return config
    },
}

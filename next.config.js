const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
    images: {
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['images.prismic.io', 'i.imgur.com'],
    },
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    sentry: {
        hideSourceMaps: true,
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

const sentryWebpackPluginOptions = {
    silent: true,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

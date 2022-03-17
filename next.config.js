// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

const basePath = '';

module.exports = withImages({
  esModule: true,
  exclude: /\.svg$/,
  poweredByHeader: false,
  webpack5: true,
  inlineImageLimit: false,
  images: {
    disableStaticImages: true
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  basePath
});

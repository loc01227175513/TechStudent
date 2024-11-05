module.exports = {
  images: {
    domains: ['via.placeholder.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ico$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/',
        publicPath: '/_next/static/',
      },
    });
    return config;
  },
};
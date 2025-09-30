const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 엔트리
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 빌드 시 dist 초기화
  },
  module: {
    rules: [
      // EJS
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: { sources: false, minimize: false },
          },
          'ejs-plain-loader',
        ],
      },
      // SCSS
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // 이미지
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // dist/assets/images/
        },
      },
      // 폰트
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]', // dist/assets/fonts/
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, 'src/scss/'),
      '@js': path.resolve(__dirname, 'src/js/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    },
  },
  mode: 'development',
};

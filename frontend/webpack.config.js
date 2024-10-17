// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your React app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development', // or 'production' for production builds
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // For transpiling JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        
      },
      {
        test: /\.css$/, // For CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Loads CSS into the JS
          'postcss-loader', // Processes the CSS with PostCSS (for Tailwind)
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // For image files
        type: 'asset/resource', // Automatically choose between file-loader and url-loader
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML file template
    }),
    new MiniCssExtractPlugin(), // Plugin to extract CSS into files
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Directory for the dev server
    compress: true,
    port: 3000, // Port for the dev server
    hot: true, // Hot module replacement
    historyApiFallback: true, 
  },
  resolve: {
    extensions: ['.js', '.jsx'], // File extensions Webpack will resolve
  },
};

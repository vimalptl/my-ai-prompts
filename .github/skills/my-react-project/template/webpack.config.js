const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';
  const serviceFile = isProduction
    ? 'src/services/services.admin.js (PRODUCTION)'
    : 'src/services/services.admin.dev.js (DEVELOPMENT)';
  const resolvedServicePath = isProduction
    ? 'src/services/services.admin.js'
    : 'src/services/services.admin.dev.js';

  console.log(`[webpack] mode=${mode}`);
  console.log(`[webpack] service file=${serviceFile}`);

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      publicPath: isProduction ? './' : '/',
      clean: true
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'services/services.admin': isProduction
          ? path.resolve(__dirname, 'src/services/services.admin.js')
          : path.resolve(__dirname, 'src/services/services.admin.dev.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.s[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.beforeCompile.tap('ServiceFileVerifier', () => {
            const expectedFile = path.resolve(__dirname, resolvedServicePath);

            if (!fs.existsSync(expectedFile)) {
              throw new Error(`Required service file not found: ${expectedFile}`);
            }

            console.log(`[webpack] verified service file=${path.basename(expectedFile)}`);
          });
        }
      },
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true
    },
    mode,
    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};
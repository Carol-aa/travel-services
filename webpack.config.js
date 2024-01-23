const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], //ES6转换成ES5
            plugins: [
              ['@babel/plugin-transform-runtime'], //集成React
            ],
          },
        },
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      //options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), //重新打包自动删除上次打包的东西
    new htmlWebpackPlugin({
      template: './public/index.html', // 生成HTML文件的模板文件
      filename: 'index.html', // 生成的HTML文件名
      inject: 'body', // <script>标签插入的地方
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8080, // 修改端口为你需要的端口
  },
};

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
            presets: ['@babel/preset-env'],//ES6转换成ES5
            plugins: [
              ["@babel/plugin-transform-runtime"]//集成React
          ]
        }
        },
        
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html', // 生成HTML文件的模板文件
      filename: 'index.html', // 生成的HTML文件名
      inject: 'body', // <script>标签插入的地方
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8080, // 修改端口为你需要的端口
  },
};

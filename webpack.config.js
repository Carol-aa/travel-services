const path = require('path');
const webpack = require("webpack");
// babel 缓存路径
const BABEL_CACHE_DIR = path.resolve(__dirname, '../.babel-cache')
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {resolve} = path;
module.exports = {
  entry: './src/index.js',
  output: {
    filename: "scripts/[name].[contenthash].js",
    chunkFilename: "scripts/[name].[contenthash].js",
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
    // alias： 用于创建模块别名，以便更方便地引用模块。
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
    // 用于配置解析模块时的降级策略。在这里，当模块请求 stream 时，它将被解析为 stream-browserify。
    extensions: [".wasm", ".mjs", ".ts", ".tsx", ".js", ".jsx", '.less', ".json"],
    // 指定在解析模块时自动添加的文件扩展名
    plugins: [
      new TsConfigPathsPlugin({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
      }),
      // 包含了一个 TsConfigPathsPlugin 插件，该插件用于解析 TypeScript 项目中的路径别名。它允许 Webpack 根据 tsconfig.json 中的路径别名配置来解析模块。
    ],
    modules: ['node_modules'],
    // 指定模块的查找目录。在这里，只查找 node_modules。
    mainFiles: ['index'],
    // 当解析目录时要使用的文件名，默认为 index。这表示当你导入一个目录时，默认会查找该目录下的 index 文件。
  },
  module: {
    rules: [
      {
        test:/\.(j|t)sx?$/,
        exclude: /node_modules/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env'], //ES6转换成ES5
        //     plugins: [
        //       ['@babel/plugin-transform-runtime'], //集成React
        //     ],
        //   },
        // },
        use:[
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: BABEL_CACHE_DIR,
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: [
              {
                loader:  "style-loader" ,
              },
              { loader: "css-loader", options: { modules: true } },
              { loader: "postcss-loader" },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    paths: [resolve("node_modules"), resolve("src/styles")],
                  },
                },
              },
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [resolve("src/styles/theme.less")],
                },
              },
            ],
          },
          {
            use: [
              {
                loader:  "style-loader"
              },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    paths: [resolve("node_modules"), resolve("src/styles")],
                  },
                },
              },
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [resolve("src/styles/theme.less")],
                },
              },
            ],
          },
        ],
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'less-loader',
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           [
        //             'postcss-preset-env',
        //             {
        //               //options
        //             },
        //           ],
        //         ],
        //       },
        //     },
        //   },
        // ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        resourceQuery: { not: [/react/] },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb 大于4kb 视为resource 模块类型
          },
        },
        generator: {
          filename: "assets/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.jsx?$/,
        resourceQuery: /react/, // exclude react component if *.svg?react
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: './',
      //       },
      //     },
      //     'css-loader',
      //   ],
      // },

    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // 配置 Webpack 的 IgnorePlugin 插件，用于在打包时忽略掉 moment 库中的 locale 文件。可以减小打包体积
    new CleanWebpackPlugin(), //重新打包自动删除上次打包的东西
    new htmlWebpackPlugin({
      template: resolve("src/index.html"),// 生成HTML文件的模板文件
      filename: 'index.html', // 生成的HTML文件名
      inject: 'body', // <script>标签插入的地方
      minify: {// 用于指定是否对生成的 HTML 进行压缩。
        minifyCSS: true,// 是否压缩内联的 CSS。
        removeComments: true,//是否移除 HTML 中的注释。
        collapseWhitespace: true,//是否折叠空白字符，即是否将多个连续的空格字符替换为一个空格。
        removeAttributeQuotes: false,//是否移除 HTML 属性值周围的引号
      },
     
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    new CaseSensitivePathsPlugin(),//系统检测大小写


  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8080, // 修改端口为你需要的端口
  },
};




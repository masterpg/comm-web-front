const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * バンドル時の出力情報設定
 *
 * 設定内容は以下URLを参照:
 * ・https://webpack.js.org/configuration/stats/
 * ・https://github.com/webpack/webpack/blob/5b5775f9e2fc73fea46629f2d6a3ed7a1f8424d3/lib/Stats.js#L696-L730
 */
const stats = {
  assets: false,
  children: false,
  chunks: false,
  entrypoints: false,
  hash: false,
  moduleTrace: false,
  modules: false,
  publicPath: false,
  reasons: false,
  source: false,
  timings: false,
  version: false,
  errors: true,
  errorDetails: true,
  warnings: true,
}

/**
 * Webpack設定
 */
const config = {
  mode: 'development',

  stats,

  entry: {
    demo: path.resolve(__dirname, './src/index.ts'),
    test: path.resolve(__dirname, '../test/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({configFile: path.resolve(__dirname, '../tsconfig.json')})],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        // Best practice: https://github.com/babel/babel/issues/7789
                        '>=1%',
                        'not op_mini all',
                        'ie 11',
                      ],
                    },
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: true,
              },
            },
          },
        ],
        // ローダーの処理対象から外すディレクトリ
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'postcss-loader',
            options: {config: {path: __dirname}},
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo.html', // パスは`output.path`を基準
      template: path.resolve(__dirname, './src/index.html'),
      inject: false,
      bundledScript: 'demo.bundle.js',
    }),

    new HtmlWebpackPlugin({
      filename: 'test.html', // パスは`output.path`を基準
      template: path.resolve(__dirname, '../test/index.html'),
      inject: false,
      bundledScript: 'test.bundle.js',
    }),

    // `to: xxx`の`xxx`は`output.path`が基準になる
    new CopyWebpackPlugin([
      {from: 'node_modules/mocha/mocha.css', to: 'node_modules/mocha'},
      {from: 'node_modules/mocha/mocha.js', to: 'node_modules/mocha'},
      {from: 'node_modules/chai/chai.js', to: 'node_modules/chai'},
      {from: 'node_modules/@webcomponents/webcomponentsjs/**/*.js'},
    ]),
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 5000,
    host: '0.0.0.0',
    disableHostCheck: true,
    stats,
    // historyApiFallbackの設定は以下URLを参照:
    // https://github.com/webpack/docs/wiki/webpack-dev-server#the-historyapifallback-option
    historyApiFallback: {
      rewrites: [],
    },
  },
}

module.exports = config

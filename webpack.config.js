const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("babel-polyfill");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./app.js"]
  },
  devServer: {
    publicPath: "/",
    port: 9000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    hot: true
  },
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        test: /\.js$/
      },
      {
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" }
        ],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./style.css" }),
    new HtmlWebpackPlugin({ template: "./index.html" })
  ],
  output: {
    filename: "bundel.js"
  },
  mode: "development"
};

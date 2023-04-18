/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevMode = process.env.NODE_ENV === "development";
const isProd = !isDevMode;

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
    // filename: isProd ? '[name].[hash].js' : '[name].js',
    assetModuleFilename: "assets/[name][ext]"
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [isDevMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: [".ts", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css"
      // filename: isProd ? '[name].[hash].css' : '[name].css'
    })
  ],

  devServer: {
    port: 3000,
    open: true,
    hot: true
  }
};

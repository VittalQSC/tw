const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(process.cwd(), "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(css|s[ac]ss)$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      // },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: "posts",
      filename: "remoteEntry.js",
      exposes: {
        "./Posts": "./src/components/Posts",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

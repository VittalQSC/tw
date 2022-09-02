const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3004,
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
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/components/Profile",
        // "./CreatePost": "./src/components/CreatePost.tsx",
      },
      shared: {
        ...deps,
        axios: {
          singleton: true,
          requiredVersion: deps["axios"],
        },
        "react-hook-form": {
          singleton: true,
          requiredVersion: deps["react-hook-form"],
        },
        "mobx-react-lite": {
          singleton: true,
          requiredVersion: deps["mobx-react-lite"],
        },
        mobx: { singleton: true, requiredVersion: deps["mobx"] },
        react: { singleton: true, requiredVersion: deps["react"] },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

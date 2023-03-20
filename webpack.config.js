const path = require("path");
const dotenv = require('dotenv')
const webpack = require('webpack')
const envFile = dotenv.config().parsed
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

let environmentPlugin = []

if (envFile) {
  const envKeys = Object.keys(envFile).reduce((prev, next) => {
    prev[`${next}`] = JSON.stringify(envFile[next])
    return prev
  }, {})

  environmentPlugin = [new webpack.DefinePlugin({ process: { env: { ...envKeys } } })]
}
else {
  environmentPlugin = [
    new webpack.DefinePlugin({
      process: {
        env: {
          // if u need other envs or add
        },
      },
    }),
  ]
}

const config = {
  entry: "./src/index.ts",
  target: "webworker",
  output: {
    filename: "function.js",
    path: path.resolve(__dirname, "worker"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    ...environmentPlugin,
    new CleanWebpackPlugin()
  ],
};

module.exports = () => {
  config.mode = "development";
  if (isProduction) {
    config.mode = "production";
  }
  return config;
};

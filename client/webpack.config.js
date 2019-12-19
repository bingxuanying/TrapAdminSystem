const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8080
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/template.html" })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 40000
            }
          }
        ]
      }
    ]
  }
};

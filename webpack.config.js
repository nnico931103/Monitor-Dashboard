const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // 指定入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 輸出文件夾
    filename: "bundle.js", // 輸出的打包文件名
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // 設置可以處理的文件擴展名
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 使用 ts-loader 處理所有 .ts 和 .tsx 文件
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 處理 CSS 文件
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "./dist", // 指定開發伺服器的目錄
    hot: true, // 啟用熱模塊替換
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};

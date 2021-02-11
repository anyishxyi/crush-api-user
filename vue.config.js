module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
      	'process.env.__MONGO_URI__': JSON.stringify(process.env.__MONGO_URI__)
    	})
    ]
  }
}
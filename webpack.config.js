module.exports = {
  context: __dirname + "/src",

  entry: {
	  javascript: "./app.js",
	  html: "./index.html",
	},
  
  output: {
    filename:'[name].js',
    path: __dirname + "/dist"
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
	  loaders: [
	  	{
			  test: /\.html$/,
			  loader: "file-loader?name=[name].[ext]",
			},
	    {
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loaders: ["babel-loader"],
	    },
	  ],
	}
}
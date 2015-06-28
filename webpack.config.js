var path = require("path");
var webpack = require("webpack");
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    cache: true,
    entry: {
        homepage: './server/react/pages/home.jsx',
        secondpage: './server/react/pages/second.jsx'
    },
    output: {
        path: path.join(__dirname, "public/js"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            // required for react jsx
            { test: require.resolve("react"), loader: "expose?React" },
            { test: /\.js$/,    loader: "jsx-loader" },
            { test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
        ]
    },
    plugins: [
        new CommonsChunkPlugin("common.js"),
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ]
};

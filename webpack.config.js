var path = require("path");
var fs = require('fs');
var _ = require('lodash');
var webpack = require("webpack");
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entry = {};
var pages_path = path.join(__dirname, 'react/pages');
var pages = fs.readdirSync(pages_path);
_.each(pages, function(page){
    if (path.extname(page) === '.jsx'){
        entry[path.basename(page, '.jsx')] = path.join(pages_path, page);
    }
});

module.exports = {
    cache: true,
    entry: entry,
    output: {
        path: path.join(__dirname, "public/js"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            // required for react jsx
            { test: /\.js$/,    loader: "jsx-loader?harmony" },
            { test: /\.jsx$/,   loader: "jsx-loader?harmony&insertPragma=React.DOM" },
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
    ],
    externals: [
        function(context, request, callback){
            if (/lib\/translator$/.test(request)){
                var file = fs.readFileSync('./server/lib/translator-web.js', {encoding: 'utf8'});
                return callback(null, file);
            }
            callback();
        }
    ]
};

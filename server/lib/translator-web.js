module.exports = function(lang){
    function format(){
        var args = [];
        for (var a in arguments){
            args.push(arguments[a]);
        }

        if (args.length === 1){ return args[0]; }

        var fmt = args.shift();

        if (args.length === 1 && typeof args[0] === 'object'){
            return fmt.replace(/%\(\s*([^)]+)\s*\)s/g, function(m, v){
                return String(args[0][v.trim()]);
            });
        }

        return fmt.replace(/%s/g, function(){
            return String(args.shift());
        });
    }

    return function(word){
        var args = arguments;
        if (args.length === 0) { return ""; }
        args[0] = window.json_locale_data.messages[word] && window.json_locale_data.messages[word][1] || word;
        return format.apply(this, args);
    };
};
// webpack replaces translator.js with the content in this file

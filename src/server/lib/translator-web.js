/* eslint "prefer-rest-params": 0 */

module.exports = function translator() {
    function format() {
        const args = [];
        for (const a in arguments) {
            if ({}.hasOwnProperty.call(arguments, a)) {
                args.push(arguments[a]);
            }
        }

        if (args.length === 1) { return args[0]; }

        const fmt = args.shift();

        if (args.length === 1 && typeof args[0] === 'object') {
            return fmt.replace(/%\(\s*([^)]+)\s*\)s/g, (m, v) =>
                String(args[0][v.trim()])
            );
        }

        return fmt.replace(/%s/g, () =>
            String(args.shift())
        );
    }

    return function formatWord(word) {
        const args = arguments;
        const localeData = window.json_locale_data;
        if (args.length === 0) { return ''; }
        args[0] = localeData.messages[word] && localeData.messages[word][1] || word;
        return format.apply(this, args);
    };
};
// webpack replaces translator.js with the content in this file

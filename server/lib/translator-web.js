module.exports = function(lang){
    return function(word){
        return window.json_locale_data.messages[word] && window.json_locale_data.messages[word][1] || word;
    };
};
// webpack replaces translator.js with the content in this file

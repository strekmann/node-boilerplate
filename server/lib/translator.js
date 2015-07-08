module.exports = function(lang){
    try{
        var translations = require('../../public/js/' + lang + '/messages.json').messages;
        return function(word){
            return translations[word] && translations[word][1] || word;
        };
    } catch(e){
        return function(word){
            return word;
        };
    }
};

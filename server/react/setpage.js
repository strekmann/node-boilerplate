module.exports = function(module){
    if (typeof window !== 'undefined'){
        window.s7nPage = module;
    }
};

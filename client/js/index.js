moment.locale($('html').attr('locale'));

var helpers = Ractive.defaults.data;
helpers.isodate = function(timestring){
    return moment(timestring).format();
};

helpers.shortdate = function(timestring){
    return moment(timestring).format('LL');
};

module.exports = {
    account: require('./account'),
};

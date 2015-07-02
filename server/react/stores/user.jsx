var alt = require('../alt'),
    UserActions = require('../actions/user.jsx'),
    _ = require('lodash');

function UserStore(){
    this.bindListeners({
        onUpdateUser: UserActions.updateUser,
        onSaveUser: UserActions.saveUser,
        onUserFailed: UserActions.userFailed
    });

    // component states
    this.user = {};
    this.errorMessage = null;
    this.formErrors = {};

    this.exportPublicMethods({
        hasUser: function(){
            return !_.isEmpty(this.getState().user);
        }
    });
}

UserStore.prototype.onUpdateUser = function(user){
    this.user = user;
    this.errorMessage = null;
    this.formErrors = {};
};

UserStore.prototype.onSaveUser = function(){
    this.errorMessage = null;
    this.formErrors = {};
};

UserStore.prototype.onUserFailed = function(data){
    if (data.error){
        this.errorMessage = data.error;
    }
    else if(data.errors){
        var errors = _.reduce(data.errors, function(result, obj){
            result[obj.param] = obj.msg;
            return result;
        }, {});
        this.formErrors = errors;
    }
};

module.exports = alt.createStore(UserStore, 'UserStore');

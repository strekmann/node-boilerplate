var alt = require('../alt'),
    UserActions = require('../actions/user.jsx'),
    _ = require('lodash');

function UserStore(){
    this.bindListeners: {
        onUpdateUser: UserActions.updateUser,
        onSaveUser: UserActions.saveUser,
        onUserFailed: UserActions.userFailed
    };

    this.user = {};
    this.errorMessage = null;

    this.exportPublicMethods({
        hasUser: function(){
            return !_.isEmpty(this.getState().user);
        }
    });
}

UserStore.prototype.onUpdateUser = function(user){
    this.user = user;
    this.errorMessage = null;
};

UserStore.prototype.onSaveUser = function(){
    this.user = {};
    this.errorMessage = null;
};

UserStore.prototype.onUserFailed = function(error){
    this.errorMessage = error;
};

module.exports = alt.createStore(UserStore, 'UserStore');

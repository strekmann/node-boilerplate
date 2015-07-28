var alt = require('../alt'),
    UserActions = require('../actions/user.jsx'),
    _ = require('lodash'),
    Immutable = require('immutable');

class UserStore {
    constructor(){
        this.bindListeners({
            onUpdateUser: UserActions.updateUser,
            onSaveUser: UserActions.saveUser,
            onUserFailed: UserActions.userFailed
        });

        // component states
        this.user = {};
        this.errorMessage = null;
        this.formErrors = {};
    }


    onUpdateUser(user){
        this.user = user;
        this.errorMessage = null;
        this.formErrors = {};
    }

    onSaveUser(){
        this.errorMessage = null;
        this.formErrors = {};
    }

    onUserFailed(data){
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
    }

    static getImmState(){
        return Immutable.fromJS(this.getState());
    }

    static hasUser(){
        return !_.isEmpty(this.getState().user);
    }

    static getUser(){
        return Immutable.fromJS(this.getState().user);
    }

    static getFormErrors(){
        return Immutable.fromJS(this.getState().formErrors);
    }

    static getErrorMessage(){
        return this.getState().errorMessage;
    }
}

module.exports = alt.createStore(UserStore, 'UserStore');

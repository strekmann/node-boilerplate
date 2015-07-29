var alt = require('../alt'),
    axios = require('axios');


class UserActions {
    constructor(){
        this.generateActions('userFailed', 'updateUser');
    }

    saveUser(user){
        var self = this;
        self.dispatch();

        axios.put('/account', user)
        .then(function(response){
            self.actions.updateUser(response.data);
        })
        .catch(function(response){
            if (response instanceof Error){
                self.actions.userFailed(response.message);
            }
            else {
                self.actions.userFailed(response.data);
            }
        });
    }
}

module.exports = alt.createActions(UserActions);

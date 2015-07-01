var React = require('react'),
    FluxyMixin = require('alt/mixins/FluxyMixin'),
    UserActions = require('../actions/user.jsx'),
    UserStore = require('../stores/user.jsx');

// A very simple page with a square on it.
var HomePage = React.createClass({
    mixins: [FluxyMixin],
    displayName: 'HomePage',

    getInitialState: function(){
        return UserStore.getState();
    },

    componentWillMount: function(){
        console.log('component will mount');
    },
    componentDidMount: function(){
        console.log('component did mount');
    },
    componentWillUnount: function(){
        console.log('component will unmount');
    },

    statics: {
        storeListeners: {
            onUserChange: UserStore
        }
    },

    onUserChange: function(){
        this.setState(UserStore.getState());
    },

    saveUser: function(){
        UserActions.saveUser({
            name: 'Derp',
            email: 'derp@ntnu.no'
        });
    },

    render: function(){
        console.log(this.state);
        if (this.state.errorMessage){
            return (
                <div>
                    {this.state.errorMessage}
                </div>
            );
        }

        return (
            <div>
                <ul>
                    <li>{this.state.user.name}</li>
                    <li>{this.state.user.email}</li>
                </ul>
                <button onClick={this.saveUser}>Save</button>
            </div>
        );
    }
});

require('../bootstrap')(HomePage);
module.exports = HomePage;

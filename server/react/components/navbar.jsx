var React = require('react'),
    FluxyMixin = require('alt/mixins/FluxyMixin'),
    Navbar = require('react-bootstrap/lib/Navbar'),
    Nav = require('react-bootstrap/lib/Nav'),
    NavItem = require('react-bootstrap/lib/NavItem'),
    UserStore = require('../stores/user.jsx');

var TestNavbar = React.createClass({
    mixins: [FluxyMixin],
    displayName: 'TestNavbar',

    getInitialState: function(){
        var storeState = UserStore.getState();
        return {
            user: storeState.user
        };
    },

    render: function () {
        var userItem;
        if (this.state.user) {
            userItem = (<NavItem href="/account">{this.state.user.name}</NavItem>);
        }
        else {
            userItem = (<NavItem href="/auth/google">Log in</NavItem>);
        }

        return (
            <Navbar brand="React-Test">
                <Nav left>
                    {userItem}
                </Nav>
            </Navbar>
        );
    }
});

module.exports = TestNavbar;

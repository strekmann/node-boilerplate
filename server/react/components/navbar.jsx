var React = require('react'),
    FluxyMixin = require('alt/mixins/FluxyMixin'),
    Navbar = require('react-bootstrap/lib/Navbar'),
    Nav = require('react-bootstrap/lib/Nav'),
    CollapsibleNav = require('react-bootstrap/lib/CollapsibleNav'),
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

    // listen to store changes - fluxymixin
    statics: {
        storeListeners: {
            onUserChange: UserStore
        }
    },

    onUserChange: function(){
        this.setState({
            user: UserStore.getState().user
        });
    },

    render: function () {
        var userItem;
        if (UserStore.hasUser()) {
            userItem = (<NavItem href="/account">{this.state.user.name}</NavItem>);
        }
        else {
            userItem = (<NavItem href="/auth/google">Log in</NavItem>);
        }

        return (
            <Navbar
                brand={<a href="/">React-Test</a>}
                toggleNavKey={0}>
                <CollapsibleNav eventKey={0}>
                    <Nav navbar right>
                        {userItem}
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    }
});

module.exports = TestNavbar;

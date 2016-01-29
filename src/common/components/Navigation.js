var React = require('react'),
    Navbar = require('react-bootstrap/lib/Navbar'),
    Nav = require('react-bootstrap/lib/Nav'),
    CollapsibleNav = require('react-bootstrap/lib/CollapsibleNav'),
    NavItem = require('react-bootstrap/lib/NavItem');

var TestNavbar = React.createClass({
    displayName: 'TestNavbar',

    /*
    shouldComponentUpdate: function(nextProps, nextState){
        console.log('should update navbar?', this.state.user !== nextState.user);
        return this.state.user != nextState.user;
    },
    */

    render: function () {
        var user = this.props.viewer,
            userItem;

        if (user) {
            userItem = (<NavItem href="/account">{user.get('name')}</NavItem>);
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

export default TestNavbar;

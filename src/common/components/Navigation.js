var React = require('react'),
    Navbar = require('react-bootstrap/lib/Navbar'),
    Nav = require('react-bootstrap/lib/Nav'),
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
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand><a href="/">React-Test</a></Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse eventKey={0}>
                    <Nav navbar pullRight>
                        {userItem}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

export default TestNavbar;

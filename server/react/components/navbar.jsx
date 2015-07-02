var React = require('react'),
    Navbar = require('react-bootstrap/lib/Navbar'),
    Nav = require('react-bootstrap/lib/Nav'),
    NavItem = require('react-bootstrap/lib/NavItem'),
    UserStore = require('../stores/user.jsx');

/**
A simple component that doubles in size on click
*/
var TestNavbar = React.createClass({

  render: function () {
    return (
        <Navbar brand="React-Test">
            <Nav left>
                <NavItem href="/auth/google">Log in</NavItem>
            </Nav>
        </Navbar>
    );
  }
});

module.exports = TestNavbar;

import React from 'react';
import { Navbar, Nav, NavItem, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
    /*
    shouldComponentUpdate(nextProps, nextState){
        console.log('should update navbar?', this.state.user !== nextState.user);
        return this.state.user != nextState.user;
    },
    */

    render() {
        let userItem;

        if (!this.props.viewer) {
            userItem = (
                <LinkContainer to="/login">
                    <NavItem>
                        Log in
                    </NavItem>
                </LinkContainer>
            );
        }
        else {
            userItem = (
                <LinkContainer to="/account">
                    <NavItem>
                        {this.props.viewer.name}
                    </NavItem>
                </LinkContainer>
            );
        }

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand><Link to="/">React-Test</Link></Navbar.Brand>
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
}

Navigation.propTypes = {
    viewer: React.PropTypes.object,
    users: React.PropTypes.object,
    socket: React.PropTypes.object,
};

export default Navigation;

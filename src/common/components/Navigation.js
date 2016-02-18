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
        const viewerid = this.props.viewer.get('id');
        let userItem;

        if (!viewerid) {
            userItem = (<NavItem href="/auth/google">Log in</NavItem>);
        }
        else {
            userItem = (
                <LinkContainer to="/account">
                    <NavItem to="/account">
                        {this.props.users.getIn([viewerid, 'name'])}
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
                        <Navbar.Text>
                            <Label bsStyle="primary">{this.props.socket.get('usercount')}</Label>
                        </Navbar.Text> {userItem}
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

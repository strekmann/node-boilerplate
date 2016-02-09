import React from 'react';
import { Navbar, Nav, NavItem, Label } from 'react-bootstrap';

class Navigation extends React.Component {
    /*
    shouldComponentUpdate(nextProps, nextState){
        console.log('should update navbar?', this.state.user !== nextState.user);
        return this.state.user != nextState.user;
    },
    */

    render() {
        const user = this.props.viewer;
        let userItem;

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
                        <Navbar.Text>
                            <Label bsStyle="primary">{this.props.usercount}</Label>
                        </Navbar.Text> {userItem}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Navigation.propTypes = {
    viewer: React.PropTypes.object,
    usercount: React.PropTypes.number,
};

export default Navigation;
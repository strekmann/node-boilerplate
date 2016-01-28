import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/users';

class Navigation extends Component {
    render() {
        const { dispatch } = this.props;

        return (
            <nav role="navigation">
                <Link to="/">Index</Link>
                { this.props.user.authenticated ? (
                    <Link onClick={() => dispatch(logout())} to="/">Logout</Link>
                ) : (
                    <Link to="/login">Log in</Link>
                )}
                <Link to="/account">Account</Link>
            </nav>
        );
    }
}

Navigation.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navigation);

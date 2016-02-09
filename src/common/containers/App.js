import React from 'react';
import Navigation from '../components/Navigation';
import actions from '../actions/user';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navigation viewer={this.props.viewer} usercount={this.props.usercount} />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element,
    viewer: React.PropTypes.object,
    usercount: React.PropTypes.number,
};

function select(state) {
    console.error("stat", state);
    return {
        viewer: state.user.user.get('viewer'),
        usercount: state.user.user.getIn(['socket', 'usercount']),
    };
}

export default connect(select)(App);

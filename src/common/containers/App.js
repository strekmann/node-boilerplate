import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { connect } from 'react-redux';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navigation
                    viewer={this.props.viewer}
                    socket={this.props.socket}
                    users={this.props.users}
                />
                {this.props.children}
                <Footer id={this.props.viewer.get('id')} />
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element,
    viewer: React.PropTypes.object,
    socket: React.PropTypes.object,
    users: React.PropTypes.object,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
        users: state.get('users'),
        socket: state.get('socket'),
    };
}

export default connect(select)(App);

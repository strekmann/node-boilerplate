import React from 'react';
import Navigation from '../components/Navigation';
import { connect } from 'react-redux';

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
    return {
        viewer: state.get('viewer'),
        usercount: state.getIn(['socket', 'usercount']),
    };
}

export default connect(select)(App);

var React = require('react');
import Navigation from '../components/Navigation';
import actions from '../actions/user';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const App = React.createClass({

    componentDidMount() {
        this.socket = io({
            path: '/s',
        });
    },

    render() {
        return (
            <div>
                <Navigation viewer={this.props.viewer} />
                {this.props.children}
            </div>
        );
    }
});

function select(state) {
    return {
        viewer: state.get('viewer'),
    };
}

export default connect(select)(App);

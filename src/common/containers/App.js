var React = require('react');
import Navigation from '../components/Navigation';
import actions from '../actions/user';
import Immutable from 'immutable';
import { connect } from 'react-redux';

const App = React.createClass({

    render: function () {
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

import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';

export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
};

App.propTypes = {
    children: PropTypes.object
};

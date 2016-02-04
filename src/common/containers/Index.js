import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTest } from '../actions/test.js';

function loadData(props) {
    props.loadTest();
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        // bind events
    }

    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // check for prop changes then
        // loadData(this.props);
    }

    render() {
        return (
            <div>
                <p>Index page</p>
                <p>{this.props.test}</p>
            </div>
        );
    }
}

Index.propTypes = {
    loadTest: PropTypes.func.isRequired,
    test: PropTypes.string.isRequired
}

export default connect((state, props) => {
    return {
        test: state.test.test
    };
}, {
    loadTest
})(Index);

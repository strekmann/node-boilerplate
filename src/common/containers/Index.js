import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTest } from '../actions/test.js';

class Index extends React.Component {
    constructor(props) {
        super(props);
        // bind events
    }

    componentDidMount() {
        // Client runs this when component is mounted
        console.log('componentWillMount');
        const { dispatch } = this.props;
        Index.fetchData(dispatch);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
    }

    render() {
        console.log(this.props.test);
        return (
            <div>
                <p>Index page</p>
                <p>{this.props.test.msg}</p>
            </div>
        );
    }
}

Index.propTypes = {
    test: PropTypes.object.isRequired
};

Index.fetchData = function(dispatch) {
    return Promise.all([
        dispatch(loadTest())
    ]);
};

export default connect((state, props) => {
    return {
        test: state.test
    };
})(Index);

import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/user';

class Profile extends React.Component {
    render() {
        return (
            <div>{this.props.user.name}</div>
        );
    }
}

Profile.fetchData = function fetchData(dispatch, props) {
    console.log("p", props);
    return Promise.all([
        dispatch(loadUser(props.params.id)),
    ]);
};

Profile.propTypes = {
    user: React.PropTypes.object,
};

function select(state) {
    return {
        user: state.get('user'),
        viewer: state.get('viewer'),
        formErrors: state.get('formErrors'),
        errorMessage: state.get('errorMessage'),
        isSaving: state.get('isSaving'),
    };
}

export default connect(select)(Profile);

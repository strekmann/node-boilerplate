import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../actions/user';

class Profile extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h2>{this.props.user.get('name')}</h2>
                        <p>{this.props.user.get('email')}</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Profile.fetchData = function fetchData(dispatch, params) {
    return Promise.all([
        dispatch(loadUser(params.id)),
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

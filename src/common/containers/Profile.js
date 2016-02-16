import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../actions/user';
import Immutable from 'immutable';

class Profile extends React.Component {
    render() {
        const user = this.props.users.get(this.props.user.get('id'));
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h2>{user.get('name')}</h2>
                        <p>{user.get('email')}</p>
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
    users: React.PropTypes.instanceOf(Immutable.Map),
};

function select(state) {
    return {
        user: state.get('user'),
        users: state.get('users'),
    };
}

export default connect(select)(Profile);

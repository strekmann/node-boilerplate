import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class Home extends React.Component {

    render() {
        const viewerid = this.props.viewer.get('id');
        if (!viewerid) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                            <p>You need to log in</p>
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                        <ul>
                            <li>{this.props.users.getIn([viewerid, 'name'])}</li>
                            <li>{this.props.users.getIn([viewerid, 'email'])}</li>
                        </ul>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Home.propTypes = {
    viewer: React.PropTypes.object,
    users: React.PropTypes.object,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
        users: state.get('users'),
    };
}

export default connect(select)(Home);

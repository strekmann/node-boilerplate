import React from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

// A very simple page with a square on it.
var Home = React.createClass({

    render: function(){
        if (this.props.viewer) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                            <ul>
                                <li>{this.props.viewer.get('name')}</li>
                                <li>{this.props.viewer.get('email')}</li>
                            </ul>
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
                        <p>You need to log in</p>
                    </Col>
                </Row>
            </Grid>
        );
    },
});

function select(state) {
    return {
        viewer: state.get('viewer'),
    };
}

export default connect(select)(Home);

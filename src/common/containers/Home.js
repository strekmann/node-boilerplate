import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class Home extends React.Component {

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                        <ul>
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

export default Home;

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default () => (
    <footer>
        <hr />
        <Grid>
            <Row>
                <Col xs={12}>
                    <a href="/auth/logout">Log out</a>
                </Col>
            </Row>
        </Grid>
    </footer>
);

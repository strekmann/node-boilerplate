/* eslint "react/prop-types": 0 */

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default ({ viewer }) => (
    <footer>
        <hr />
        <Grid>
            <Row>
                <Col xs={12}>
                    {viewer ? <a href="/auth/logout">Log out</a> : null}
                </Col>
            </Row>
        </Grid>
    </footer>
);

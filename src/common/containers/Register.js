import React from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';

class Register extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Register</h1>
                        <form action="/auth/register" method="post">
                            <Input
                                required
                                label={'Name'}
                                name="name"
                                type="text"
                            />
                            <Input
                                required
                                label={'Email'}
                                name="email"
                                type="email"
                            />
                            <Input
                                required
                                label={'Password'}
                                name="password"
                                type="password"
                            />
                            <Button type="submit" bsStyle="primary">{'Lagre'}</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Relay.createContainer(Register, {
    fragments: {
        viewer: () => Relay.QL`
        fragment on User {
            name,
            email,
        }
        `,
    },
});

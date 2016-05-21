import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';

class Login extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Login</h1>
                        <fieldset>
                            <Button href="/auth/google">Google login</Button>
                        </fieldset>
                        <form action="/auth/login" method="post">
                            <fieldset>
                                <h2>Login using email</h2>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                />
                                <Button type="submit" bsStyle="primary">Login</Button>
                                {" or "}
                                <Link to="/register">Register</Link>
                            </fieldset>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Login.propTypes = {
    viewer: React.PropTypes.object,
};

export default Relay.createContainer(Login, {
    fragments: {
        viewer: () => Relay.QL`
        fragment on User {
            name,
            email,
        }
        `,
    },
});

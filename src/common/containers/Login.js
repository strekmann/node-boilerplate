import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';

import { loginUser } from '../actions/viewer';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }
    onLogin(e) {
        e.preventDefault();
        this.props.dispatch(loginUser({
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
        }));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Login</h1>
                        <fieldset>
                            <Button href="/auth/google">Google login</Button>
                        </fieldset>
                        <form onSubmit={this.onLogin}>
                            <fieldset>
                                <h2>Login using email</h2>
                                <Input
                                    type="email"
                                    ref="email"
                                    placeholder="email"
                                />
                                <Input
                                    type="password"
                                    ref="password"
                                    placeholder="password"
                                />
                                <p>Hint: email: example@ninja.com password: ninja</p>
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
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
    };
}
export default connect(select)(Login);

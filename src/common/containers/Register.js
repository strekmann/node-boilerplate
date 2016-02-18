import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';

import { registerUser } from '../actions/viewer';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
    }

    onRegister(e) {
        e.preventDefault();
        this.props.dispatch(registerUser({
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
        }));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Register</h1>
                        <form onSubmit={this.onRegister}>
                            <Input
                                required
                                label={'Name'}
                                ref="name"
                                type="text"
                            />
                            <Input
                                required
                                label={'Email'}
                                ref="email"
                                type="email"
                            />
                            <Input
                                required
                                label={'Password'}
                                ref="password"
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

Register.propTypes = {
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
    };
}
export default connect(select)(Register);

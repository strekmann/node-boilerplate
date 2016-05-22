import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import translator from '../../server/lib/translator';
import UserUpdateMutation from '../mutations/userUpdate';
import { Grid, Row, Col, Button, Input, Alert, FormControls } from 'react-bootstrap';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.state = {
            name: props.viewer.name,
            email: props.viewer.email,
        };
    }

    componentWillReceiveProps(nextProps) {
        const viewer = this.props.viewer;
        const nextViewer = nextProps.users.get(nextProps.viewer);
        if (viewer !== nextViewer) {
            this.setState({
                name: nextViewer.name,
                email: nextViewer.email,
            });
        }
    }

    setName() {
        this.setState({ name: this.refs.name.getValue() });
    }

    setEmail() {
        this.setState({ email: this.refs.email.getValue() });
    }

    saveUser(e) {
        e.preventDefault();
        Relay.Store.commitUpdate(new UserUpdateMutation({ viewer: this.props.viewer }));
    }

    render() {
        const __ = translator(this.props.lang);
        const viewer = this.props.viewer;
        const errorMessage = this.props.viewer.errorMessage;
        const isSaving = this.props.viewer.isSaving;

        const viewerid = this.props.viewer.id;

        let alert;
        if (errorMessage) {
            alert = (<Alert bsStyle="danger">
                <strong>{errorMessage}</strong>
            </Alert>);
        }

        // const userCreated = moment(viewer.created).format('llll');
        const userCreated = viewer.created;

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                            <h1>{__('User information')}</h1>
                            {alert}
                            <form
                                className="form-horizontal"
                                onSubmit={!isSaving ? this.saveUser : null}
                            >
                                <FormControls.Static
                                    label="ID"
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9" value={viewerid}
                                />
                                <Input
                                    label={__('Name')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Name')}
                                    value={this.state.name}
                                    onChange={this.setName}
                                    ref="name"
                                />
                                <Input
                                    label={__('Email')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Email')}
                                    value={this.state.email}
                                    onChange={this.setEmail}
                                    ref="email"
                                />
                                <Input
                                    label={__('Active')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={this.props.viewer.is_active}
                                    disabled
                                />
                                <Input
                                    label={__('Admin')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={this.props.viewer.is_admin}
                                    disabled
                                />
                                <FormControls.Static
                                    label={__('Created')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    value={userCreated}
                                />
                                <Row>
                                    <Col md={9} mdOffset={3}>
                                        <Button
                                            type="submit"
                                            bsStyle="primary"
                                            disabled={isSaving}
                                        >
                                            {isSaving ?
                                                <i className="fa fa-spinner fa-spin fa-lg"></i>
                                                : __('Save')
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

Account.propTypes = {
    viewer: React.PropTypes.object,
    lang: React.PropTypes.string,
};

export default Relay.createContainer(Account, {
    fragments: {
        viewer: () => Relay.QL`
        fragment on User {
            id,
            name,
            email,
            is_active,
            is_admin,
            created,
            ${UserUpdateMutation.getFragment('viewer')},
        }
        `,
    },
});

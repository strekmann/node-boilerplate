import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import translator from '../../server/lib/translator';
import UserUpdateMutation from '../mutations/userUpdate';

//import { Grid, Row, Col, Button, Input, Alert, FormControls } from 'react-bootstrap';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../theme';
import { RaisedButton, TextField, Checkbox } from 'material-ui';

class Account extends React.Component {
    static contextTypes = {
        relay: Relay.PropTypes.Environment,
    };

    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        if (props.viewer){
            this.state = {
                name: props.viewer.name,
                email: props.viewer.email,
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        const viewer = this.props.viewer;
        const nextViewer = nextProps.users.get(nextProps.viewer);
        if (viewer !== nextViewer) {
            this.setState({
                name: nextViewer.name,
                email: nextViewer.email,
                updated: null,
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
        this.context.relay.commitUpdate(new UserUpdateMutation({ viewer: this.props.viewer, email: this.state.email }), {onSuccess: () => { this.setState({ updated: moment() }); }});
    }

    render() {
        const __ = translator(this.props.lang);
        const viewer = this.props.viewer;

        if (!viewer) {
            return (
                <pre>Not authorized</pre>
            );
        }

        const errorMessage = this.props.viewer.errorMessage;
        const isSaving = this.props.viewer.isSaving;

        const viewerid = this.props.viewer.id;

        let alert;
        if (errorMessage) {
            alert = (<strong>{errorMessage}</strong>);
        }
        else if (this.state.updated) {
            alert = (<strong>Oppdatert {this.state.updated.format('llll')}</strong>);
        }

        const userCreated = moment(viewer.created).format('llll');

        return (
            <div>
                <h1>{__('User information')}</h1>
                {alert}
                <form
                    className="form-horizontal"
                    onSubmit={!isSaving ? this.saveUser : null}
                >
                    <TextField
                        id="name"
                        floatingLabelText={__('Name')}
                        value={this.state.name}
                        onChange={this.setName}
                        ref="name"
                    />
                    <TextField
                        id="email"
                        floatingLabelText={__('Email')}
                        value={this.state.email}
                        onChange={this.setEmail}
                        ref="email"
                    />
                    <Checkbox
                        label={__('Active')}
                        checked={this.props.viewer.is_active}
                        disabled
                    />
                    <Checkbox
                        label={__('Admin')}
                        checked={this.props.viewer.is_admin}
                        disabled
                    />
                    {userCreated}
                    <RaisedButton
                        type="submit"
                        primary
                        disabled={isSaving}
                    >
                        {isSaving ?
                            <i className="fa fa-spinner fa-spin fa-lg"></i>
                            : __('Save')
                        }
                    </RaisedButton>
                </form>
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

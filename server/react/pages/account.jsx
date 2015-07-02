var React = require('react'),
    moment = require('moment'),
    _ = require('lodash'),
    FluxyMixin = require('alt/mixins/FluxyMixin'),
    UserActions = require('../actions/user.jsx'),
    UserStore = require('../stores/user.jsx');

var Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    Button = require('react-bootstrap/lib/Button'),
    Input = require('react-bootstrap/lib/Input'),
    FormControls = require('react-bootstrap/lib/FormControls');

// A very simple page with a square on it.
var AccountPage = React.createClass({
    mixins: [FluxyMixin],
    displayName: 'AccountPage',

    getInitialState: function(){
        var storeState = UserStore.getState();
        return {
            user: storeState.user,
            errorMessage: storeState.errorMessage,
            formErrors: storeState.formErrors,
            isSaving: false
        };
    },

    // listen to store changes - fluxymixin
    statics: {
        storeListeners: {
            onUserChange: UserStore
        }
    },

    onUserChange: function(){
        var state = UserStore.getState();
        state.isSaving = false;
        this.setState(state);
    },

    // action events
    saveUser: function(){
        UserActions.saveUser(this.state.user);
        this.setState({isSaving: true});
    },

    // component events
    userChange: function(){
        var user = this.state.user;
        user.username = this.refs.username.getValue();
        user.name = this.refs.name.getValue();
        user.email = this.refs.email.getValue();

        this.setState({
            user: user,
            errorMessage: null,
            formErrors: {}
        });
    },

    render: function(){
        if (this.state.errorMessage){
            return (
                <div>
                    {this.state.errorMessage}
                </div>
            );
        }

        var user = _.clone(this.state.user);
        user.created = moment(user.created).format('llll');

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                        <h1>User information</h1>
                        <form className="form-horizontal">
                            <FormControls.Static label="ID" labelClassName="col-md-3" wrapperClassName="col-md-9" value={user._id}/>
                            <Input
                                label="Username"
                                labelClassName="col-md-3"
                                wrapperClassName="col-md-9"
                                type="text"
                                placeholder="Username"
                                value={user.username}
                                bsStyle={this.state.formErrors.username ? 'error' : null}
                                help={this.state.formErrors.username}
                                onChange={this.userChange}
                                ref="username" />
                            <Input
                                label="Name"
                                labelClassName="col-md-3"
                                wrapperClassName="col-md-9"
                                type="text"
                                placeholder="Name"
                                value={user.name}
                                bsStyle={this.state.formErrors.name ? 'error' : null}
                                help={this.state.formErrors.name}
                                onChange={this.userChange}
                                ref="name" />
                            <Input
                                label="Email"
                                labelClassName="col-md-3"
                                wrapperClassName="col-md-9"
                                type="text"
                                placeholder="Email"
                                value={user.email}
                                bsStyle={this.state.formErrors.email ? 'error' : null}
                                help={this.state.formErrors.email}
                                onChange={this.userChange}
                                ref="email" />
                            <Input
                                label="Active"
                                wrapperClassName="col-md-9 col-md-offset-3"
                                type="checkbox"
                                checked={user.is_active}
                                disabled={true} />
                            <Input
                                label="Admin"
                                wrapperClassName="col-md-9 col-md-offset-3"
                                type="checkbox"
                                checked={user.is_admin}
                                disabled={true} />
                            <FormControls.Static label="Created" labelClassName="col-md-3" wrapperClassName="col-md-9" value={user.created}/>
                            <Row>
                                <Col md={9} mdOffset={3}>
                                    <Button
                                        bsStyle="primary"
                                        disabled={this.state.isSaving}
                                        onClick={!this.state.isSaving ? this.saveUser : null}>
                                        {this.state.isSaving ? '...' : 'Save'}
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

require('../bootstrap')(AccountPage);
module.exports = AccountPage;

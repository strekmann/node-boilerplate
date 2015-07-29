var React = require('react'),
    moment = require('moment'),
    _ = require('lodash'),
    translator = require('../../server/lib/translator'),
    FluxyMixin = require('alt/mixins/FluxyMixin'),
    UserActions = require('../actions/user.jsx'),
    Immutable = require('immutable'),
    UserStore = require('../stores/user.jsx');

var Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    Button = require('react-bootstrap/lib/Button'),
    Input = require('react-bootstrap/lib/Input'),
    Alert = require('react-bootstrap/lib/Alert'),
    TestNavbar = require('../components/navbar.jsx'),
    FormControls = require('react-bootstrap/lib/FormControls');

function defaultState(){
    var state = UserStore.getImmState();
    state = state.set('isSaving', false);
    return {data: state};
}

// A very simple page with a square on it.
var AccountPage = React.createClass({
    mixins: [FluxyMixin],
    displayName: 'AccountPage',

    getInitialState: function(){
        return defaultState();
    },

    shouldComponentUpdate: function(nextProps, nextState){
        console.log('should update account?', this.state.data !== nextState.data);
        return this.state.data !== nextState.data;
    },

    setImmState: function(fn){
        return this.setState(function(prev){
            var data = prev.data;
            return {
                data: fn(data)
            };
        });
    },

    // listen to store changes - fluxymixin
    statics: {
        storeListeners: {
            onUserChange: UserStore
        }
    },

    onUserChange: function(){
        var state = defaultState();
        this.setState(state);
    },

    // action events
    saveUser: function(){
        UserActions.saveUser(this.state.data.get('user').toJS());

        this.setImmState(function(data){
            return data.set('isSaving', true);
        });
    },

    // component events
    userChange: function(){
        var changes = {
            username: this.refs.username.getValue(),
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue()
        };

        this.setImmState(function(data){
            return data.withMutations(function(map){
                map.mergeIn(['user'], changes)
                .set('formErrors', Immutable.Map({}))
                .set('errorMessage', null);
            });
        });
    },

    render: function(){
        var __ = translator(this.props.lang);

        var user = this.state.data.get('user'),
            formErrors = this.state.data.get('formErrors'),
            errorMessage = this.state.data.get('errorMessage'),
            isSaving = this.state.data.get('isSaving');

        if (errorMessage){
            var alert = (<Alert bsStyle='danger'>
                <strong>{errorMessage}</strong>
            </Alert>);
        }

        var user_created = moment(user.get('created')).format('llll');

        return (
            <div>
                <TestNavbar />
                <Grid>
                    <Row>
                        <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                            <h1>{__('User information')}</h1>
                            {alert}
                            <form className="form-horizontal">
                                <FormControls.Static label="ID" labelClassName="col-md-3" wrapperClassName="col-md-9" value={user.get('_id')}/>
                                <Input
                                    label={__("Username")}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Username')}
                                    value={user.get('username')}
                                    bsStyle={formErrors.get('username') ? 'error' : null}
                                    help={formErrors.get('username')}
                                    onChange={this.userChange}
                                    ref="username" />
                                <Input
                                    label={__('Name')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Name')}
                                    value={user.get('name')}
                                    bsStyle={formErrors.get('name') ? 'error' : null}
                                    help={formErrors.get('name')}
                                    onChange={this.userChange}
                                    ref="name" />
                                <Input
                                    label={__('Email')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Email')}
                                    value={user.get('email')}
                                    bsStyle={formErrors.get('email') ? 'error' : null}
                                    help={formErrors.get('email')}
                                    onChange={this.userChange}
                                    ref="email" />
                                <Input
                                    label={__('Active')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={user.get('is_active')}
                                    disabled={true} />
                                <Input
                                    label={__('Admin')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={user.get('is_admin')}
                                    disabled={true} />
                                <FormControls.Static label={__('Created')} labelClassName="col-md-3" wrapperClassName="col-md-9" value={user_created}/>
                                <Row>
                                    <Col md={9} mdOffset={3}>
                                        <Button
                                            bsStyle="primary"
                                            disabled={isSaving}
                                            onClick={!isSaving ? this.saveUser : null}>
                                            {isSaving ? <i className='fa fa-spinner fa-spin fa-lg'></i> : __('Save')}
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
});

require('../bootstrap')(AccountPage);
module.exports = AccountPage;

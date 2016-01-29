var React = require('react'),
    moment = require('moment'),
    _ = require('lodash'),
    translator = require('../../server/lib/translator');

import Immutable from 'immutable';
import { connect } from 'react-redux';
import { saveUser, setUsername, setName, setEmail } from '../actions/user';

var Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    Button = require('react-bootstrap/lib/Button'),
    Input = require('react-bootstrap/lib/Input'),
    Alert = require('react-bootstrap/lib/Alert'),
    FormControls = require('react-bootstrap/lib/FormControls');


var App = React.createClass({

    // action events
    saveUser: function() {
        //UserActions.saveUser(this.state.data.get('user').toJS());
        this.props.dispatch(saveUser({
            username: this.refs.username.getValue(),
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue()
        }));
    },

    render: function(){
        var __ = translator(this.props.lang);

        var viewer = this.props.viewer,
            formErrors = this.props.formErrors,
            errorMessage = this.props.errorMessage,
            isSaving = this.props.isSaving;

        if (errorMessage){
            var alert = (<Alert bsStyle='danger'>
                <strong>{errorMessage}</strong>
            </Alert>);
        }

        var user_created = moment(viewer.get('created')).format('llll');
        var dispatch = this.props.dispatch;

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                            <h1>{__('User information')}</h1>
                            {alert}
                            <form className="form-horizontal">
                                <FormControls.Static label="ID" labelClassName="col-md-3" wrapperClassName="col-md-9" value={viewer.get('_id')}/>
                                <Input
                                    label={__("Username")}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Username')}
                                    value={this.props.viewer.get('username')}
                                    bsStyle={formErrors.get('username') ? 'error' : null}
                                    help={formErrors.get('username')}
                                    onChange={e => dispatch(setUsername(e.target.value))}
                                    ref="username" />
                                <Input
                                    label={__('Name')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Name')}
                                    value={this.props.viewer.get('name')}
                                    bsStyle={formErrors.get('name') ? 'error' : null}
                                    help={formErrors.get('name')}
                                    onChange={e => dispatch(setName(e.target.value))}
                                    ref="name" />
                                <Input
                                    label={__('Email')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Email')}
                                    value={this.props.viewer.get('email')}
                                    bsStyle={formErrors.get('email') ? 'error' : null}
                                    help={formErrors.get('email')}
                                    onChange={e => dispatch(setEmail(e.target.value))}
                                    ref="email" />
                                <Input
                                    label={__('Active')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={viewer.get('is_active')}
                                    disabled={true} />
                                <Input
                                    label={__('Admin')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={viewer.get('is_admin')}
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
    },
});

function select(state) {
    return {
        viewer: state.get('viewer'),
        formErrors: state.get('formErrors'),
        errorMessage: state.get('errorMessage'),
        isSaving: state.get('isSaving'),
    };
}

export default connect(select)(App);

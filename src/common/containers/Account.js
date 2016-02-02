import React from 'react';
import moment from 'moment';
import translator from '../../server/lib/translator';
import { connect } from 'react-redux';
import { saveUser, setUsername, setName, setEmail } from '../actions/user';
import { Grid, Row, Col, Button, Input, Alert, FormControls } from 'react-bootstrap';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
    }
    // action events
    saveUser() {
        //UserActions.saveUser(this.state.data.get('user').toJS());
        this.props.dispatch(saveUser({
            username: this.refs.username.getValue(),
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue()
        }));
    }

    render() {
        const __ = translator(this.props.lang);
        const viewer = this.props.viewer;
        const formErrors = this.props.formErrors;
        const errorMessage = this.props.errorMessage;
        const isSaving = this.props.isSaving;
        const dispatch = this.props.dispatch;

        let alert;
        if (errorMessage) {
            alert = (<Alert bsStyle="danger">
                <strong>{errorMessage}</strong>
            </Alert>);
        }

        const userCreated = moment(viewer.get('created')).format('llll');

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
                            <h1>{__('User information')}</h1>
                            {alert}
                            <form className="form-horizontal">
                                <FormControls.Static
                                    label="ID"
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9" value={viewer.get('_id')}
                                />
                                <Input
                                    label={__('Username')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Username')}
                                    value={viewer.get('username')}
                                    bsStyle={formErrors.get('username') ? 'error' : null}
                                    help={formErrors.get('username')}
                                    onChange={e => dispatch(setUsername(e.target.value))}
                                    ref="username"
                                />
                                <Input
                                    label={__('Name')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Name')}
                                    value={viewer.get('name')}
                                    bsStyle={formErrors.get('name') ? 'error' : null}
                                    help={formErrors.get('name')}
                                    onChange={e => dispatch(setName(e.target.value))}
                                    ref="name"
                                />
                                <Input
                                    label={__('Email')}
                                    labelClassName="col-md-3"
                                    wrapperClassName="col-md-9"
                                    type="text"
                                    placeholder={__('Email')}
                                    value={viewer.get('email')}
                                    bsStyle={formErrors.get('email') ? 'error' : null}
                                    help={formErrors.get('email')}
                                    onChange={e => dispatch(setEmail(e.target.value))}
                                    ref="email"
                                />
                                <Input
                                    label={__('Active')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={viewer.get('is_active')}
                                    disabled
                                />
                                <Input
                                    label={__('Admin')}
                                    wrapperClassName="col-md-9 col-md-offset-3"
                                    type="checkbox"
                                    checked={viewer.get('is_admin')}
                                    disabled
                                />
                                <FormControls.Static label={__('Created')} labelClassName="col-md-3" wrapperClassName="col-md-9" value={userCreated}/>
                                <Row>
                                    <Col md={9} mdOffset={3}>
                                        <Button
                                            bsStyle="primary"
                                            disabled={isSaving}
                                            onClick={!isSaving ? this.saveUser : null}
                                        >
                                            {isSaving ? <i className="fa fa-spinner fa-spin fa-lg"></i> : __('Save')}
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
    formErrors: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    isSaving: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
        formErrors: state.get('formErrors'),
        errorMessage: state.get('errorMessage'),
        isSaving: state.get('isSaving'),
    };
}

export default connect(select)(Account);

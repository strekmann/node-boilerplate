import Relay from 'react-relay';

export default class UserUpdateMutation extends Relay.Mutation {
    constructor(props) {
        super(props);
        console.log("CON", props);
    }
    getMutation() {
        return Relay.QL`mutation {updateUser}`;
    }
    getVariables() {
        console.log("vars", this.props);
        return { userid: this.props.viewer.id };
    }
    getFatQuery() {
        return Relay.QL`
            fragment on UpdateUserPayload {
                viewer
            }
        `;
    }
    getConfigs() {
        console.log("props", this.props);
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                viewer: this.props.viewer.id,
            },
        }];
    }
    static fragments = {
        viewer: () => Relay.QL`
            fragment on User {
                id,
            }
        `,
    };
}

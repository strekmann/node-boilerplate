import Relay from 'react-relay';

export default class UserUpdateMutation extends Relay.Mutation {
    static fragments = {
        viewer: () => Relay.QL`
            fragment on User {
                id,
            }
        `,
    };
    getMutation() {
        return Relay.QL`mutation {updateUser}`;
    }
    getVariables() {
        return { userid: this.props.viewer.id, email: this.props.email };
    }
    getFatQuery() {
        return Relay.QL`
            fragment on UpdateUserPayload {
                viewer {
                    id
                }
            }
        `;
    }
    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                viewer: this.props.viewer.id,
            },
        }];
    }
}

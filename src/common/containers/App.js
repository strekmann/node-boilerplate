import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
    static propTypes = {
        viewer: React.PropTypes.object,
    }
    render() {
        return (
            <div>
                {this.props.viewer ? this.props.viewer.name : null}
                {this.props.children}
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
        fragment on User {
            name,
            email,
        }
        `,
    },
});

import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element,
    viewer: React.PropTypes.object,
    socket: React.PropTypes.object,
    users: React.PropTypes.object,
};

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

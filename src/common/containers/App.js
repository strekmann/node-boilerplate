import React from 'react';
import Relay from 'react-relay';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element,
        viewer: React.PropTypes.object,
        users: React.PropTypes.array,
    }

    render() {
        return (
            <div>
                <Navigation
                    viewer={this.props.viewer}
                    users={this.props.users}
                />
                {this.props.children}
                <Footer viewer={this.props.viewer} />
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

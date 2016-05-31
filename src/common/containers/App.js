import React from 'react';
import Relay from 'react-relay';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element,
        viewer: React.PropTypes.object,
        users: React.PropTypes.array,
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div>
                    <Navigation
                        viewer={this.props.viewer}
                        users={this.props.users}
                    />
                    {this.props.children}
                    <Footer viewer={this.props.viewer} />
                </div>
            </MuiThemeProvider>
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

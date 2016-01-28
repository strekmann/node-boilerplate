import React from 'react';
import ReactDomServer from 'react-dom/server';
import Helmet from 'react-helmet';
import config from '../helmconfig';

class Meta extends React.Component {
    render() {
        return (
            <Helmet
                title="Redux React"
                meta={config.meta}
                link={config.link}
            />
        );
    }
}

ReactDomServer.renderToString(<Meta />);
let header = Helmet.rewind();
export default header;

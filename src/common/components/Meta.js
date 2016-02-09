import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import config from '../../../config/helmet';

// really working ?

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

renderToString(<Meta />);
const header = Helmet.rewind();
export default header;

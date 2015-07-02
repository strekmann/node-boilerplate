var React = require('react');
var TestNavbar = require('../components/navbar.jsx');

var Grid = require('react-bootstrap/lib/Grid'),
    Row = require('react-bootstrap/lib/Row'),
    Col = require('react-bootstrap/lib/Col'),
    PageHeader = require('react-bootstrap/lib/PageHeader');

var Index = React.createClass({

    render: function () {
        return (
            <div>
                <TestNavbar />
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

require('../bootstrap')(Index);
module.exports = Index;

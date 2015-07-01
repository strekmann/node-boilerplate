var React = require('react');
var Square = require('../components/square.jsx');
var Input = require('react-bootstrap/lib/Input');

// A very simple page with a square on it.
var SecondPage = React.createClass({
  getDefaultProps: function () {
    return {
      size: 50
    }
  },

  render: function () {
    return (
        <div>
            <Square size={this.props.size} />
            <Input type="select" label="select" placeholder="select..">
                <option value="derp">Derp derp</option>
                <option value="herp">Herp herp</option>
            </Input>
        </div>
    );
  }
});

require('../bootstrap')(SecondPage);
module.exports = SecondPage;

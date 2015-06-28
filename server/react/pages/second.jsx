/** @jsx React.DOM */
var React = require('react');
var Square = require('../components/square.jsx');

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
            <span>Second page</span>
        </div>
    );
  }
});

require('../bootstrap')(SecondPage);
module.exports = SecondPage;

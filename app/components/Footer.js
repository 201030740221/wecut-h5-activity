var React = require("react");
var Router = require('react-router');
var Link = Router.Link;

var Footer = React.createClass({
    render: function () {
        return (
            <footer>
                <ul>
                    <li><Link to="main">Home</Link></li>
                    <li><Link to="login">Login</Link></li>
                </ul>
            </footer>
        );
    }
});

module.exports = Footer;
const React = require('react');

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {props};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}
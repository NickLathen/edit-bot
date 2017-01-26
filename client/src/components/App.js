const React = require('react');
const Interpretations = require('./Interpretations.js')

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interpretations: props.interpretations};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className='App'>
        <h2>Edit-Bot</h2>
        <Interpretations interpretations={this.state.interpretations} />
      </div>
    );
  }
}
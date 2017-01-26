const React = require('react');
const Redux = require('redux');
const Interpretations = require('./Interpretations.js');

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {interpretations: props.interpretations}; 
    this.store = Redux.createStore(this.reducer, initialState);
    this.store.subscribe(this.setState.bind(null, {}));
  }

  reducer(state = {}, action) {
    const newState = JSON.parse(JSON.stringify(state));
    return newState;
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className='App'>
        <p className='title center'>Edit-Bot</p>
        <Interpretations interpretations={this.store.getState().interpretations} dispatch={this.store.dispatch}/>
      </div>
    );
  }
};
const React = require('react');
const Redux = require('redux');
const Interpretations = require('./Interpretations.js');
const request = require('./../nRequest.js');

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);

    const initialState = {interpretations: props.interpretations}; 
    this.store = Redux.createStore(this.reducer, initialState);
    this.store.subscribe(this.setState.bind(this, {}));
    this.interval = false;
  }

  reducer(state = {}, action) {
    const newState = JSON.parse(JSON.stringify(state));
    if (action.type === 'newState') {
      return action.newState;
    }
    return newState;
  }
  
  render() {
    clearInterval(this.interval);
    this.interval = setInterval(function() {
      request.get('/api/interpretations', function(data) {
        data = JSON.parse(data);
        dispatch({
          type: 'newState',
          newState: {interpretations: data}
        });
      }.bind(this));
    }.bind(this), 3000);  
    return (
      <div className='App'>
        <p className='title center'>Edit-Bot</p>
        <Interpretations interpretations={this.store.getState().interpretations} dispatch={this.store.dispatch}/>
      </div>
    );
  }
};
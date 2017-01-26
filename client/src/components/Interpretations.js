const React = require('react');
const InterpretationEntry = require('./InterpretationEntry.js');

module.exports = function Interpretations(props) {
  return (
    <div className='Interpretations'>
      <h2>Interpretations Table</h2>
      {
        props.interpretations.map(function(interpretation) {
          return <InterpretationEntry interpretation={interpretation} />
        })
      }
    </div>
  );
}
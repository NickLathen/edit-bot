const React = require('react');
const InterpretationEntry = require('./InterpretationEntry.js');

module.exports = function Interpretations(props) {
  return (
    <div className='border'>
      {
        props.interpretations.map(function(interpretation) {
          return <InterpretationEntry key={interpretation.id} interpretation={interpretation} dispatch={props.dispatch}/>;
        })
      }
    </div>
  );
};
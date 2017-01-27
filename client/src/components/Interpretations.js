const React = require('react');
const InterpretationEntry = require('./InterpretationEntry.js');

module.exports = function Interpretations(props) {
  const blank = {
    id: 'new',
    text: ''
  };
  const blankInterpretation = {
    id: 'new',
    responses: [],
    triggers: []
  };
  props.interpretations.push(blankInterpretation);
  props.interpretations.forEach(function(interpretation) {
    interpretation.responses.push(blank);
    interpretation.triggers.push(blank);
  });

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
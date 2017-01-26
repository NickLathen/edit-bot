const React = require('react');
const TriggerEntry = require('./TriggerEntry.js');
const ResponseEntry = require('./ResponseEntry.js');

module.exports = function InterpretationEntry(props) {
  return (
    <div className='InterpretationEntry'>
      <p className='left gray small'>{props.interpretation.id}</p>
      <div className='Triggers'>
        <p className='title center'>When someone types:</p>
        {
          props.interpretation.triggers.map(function (trigger) {
            return <TriggerEntry trigger={trigger} dispatch={props.dispatch}/>;
          })
        }
      </div>
      <div className='Responses'>
        <p className='title center'>I will respond with...</p>
        {
          props.interpretation.responses.map(function (response) {
            return <ResponseEntry response={response} dispatch={props.dispatch} />;
          })
        }
      </div>
    </div>
  );
};
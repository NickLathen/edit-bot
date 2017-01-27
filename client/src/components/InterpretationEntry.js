const React = require('react');
const TriggerEntry = require('./TriggerEntry.js');
const ResponseEntry = require('./ResponseEntry.js');
const Avatar = require('./Avatar.js');

module.exports = function InterpretationEntry(props) {

  return (
    <div className='inset short top'>
      <p className='left gray small flat'>{props.interpretation.id}</p>
      <div className='inline column13 top'>
        <p className='center flat'>When someone says</p>
        <div className='tall'>
          {
            props.interpretation.triggers.map(function (trigger) {
              var key = trigger.id + trigger.text;
              if (trigger.id === 'new') {
                key = Math.random();
              }
              return <TriggerEntry key={key} interpretation={props.interpretation} trigger={trigger} dispatch={props.dispatch}/>;
            })
          }
        </div>
      </div>
      <div className='inline column23 top'>
        <p className='center flat'>Bot responds</p>
        <div className='Avatar inline top'>
          <Avatar src='favicon.ico' height='10%' width='10%'/>
        </div>
        <div className='ResponseTable tall inline top'>
          {
            props.interpretation.responses.map(function (response) {
              var key = response.id + response.text;
              if (response.id === 'new') {
                key = Math.random();
              }
              return <ResponseEntry key={key} interpretation={props.interpretation} response={response} dispatch={props.dispatch} />;
            })
          }
        </div>
      </div>
    </div>
  );
};
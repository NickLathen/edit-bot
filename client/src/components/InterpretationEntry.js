const React = require('react');
const EditableEntry = require('./EditableEntry.js');
const Avatar = require('./Avatar.js');
const request = require('./../nRequest.js');

const sortById = function(a, b) {
  return a.id - b.id;
};

module.exports = function InterpretationEntry(props) {

  return (
    <div className='inset short top'>
      <p className='left gray small flat'>{props.interpretation.id}</p>
      <div className='inline column13 top'>
        <p className='center flat'>When someone says</p>
        <div className='tall'>
          {
            props.interpretation.triggers.sort(sortById).map(function (trigger) {
              const interpretationId = props.interpretation.id;
              const triggerId = trigger.id;
              const edit = function edit(newText, element) {
                request.editTrigger(interpretationId, triggerId, newText, function() {
                  request.get('/api/interpretations', function(data) {
                    data = JSON.parse(data);
                    element.innerText = '';
                    props.dispatch({
                      type: 'newState',
                      newState: {interpretations: data}
                    });
                  });
                });
              };
              const remove = function remove(element) {
                request.deleteTrigger(interpretationId, triggerId, function() {
                  request.get('/api/interpretations', function(data) {
                    data = JSON.parse(data);
                    element.innerText = '';
                    props.dispatch({
                      type: 'newState',
                      newState: {interpretations: data}
                    });
                  });
                });
              };
              return <EditableEntry key={trigger.id + trigger.text} id={trigger.id} initialText={trigger.text} edit={edit} remove={remove}/>;              
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
            props.interpretation.responses.sort(sortById).map(function (response) {
              const interpretationId = props.interpretation.id;
              const responseId = response.id;
              const edit = function edit(newText, element) {
                request.editResponse(interpretationId, responseId, newText, function() {
                  request.get('/api/interpretations', function(data) {
                    data = JSON.parse(data);
                    element.innerText = '';
                    props.dispatch({
                      type: 'newState',
                      newState: {interpretations: data}
                    });
                  });
                });
              };
              const remove = function remove(element) {
                request.deleteResponse(interpretationId, responseId, function() {
                  request.get('/api/interpretations', function(data) {
                    data = JSON.parse(data);
                    element.innerText = '';
                    props.dispatch({
                      type: 'newState',
                      newState: {interpretations: data}
                    });
                  });
                });
              };
              return <EditableEntry key={response.id + response.text} id={response.id} initialText={response.text} edit={edit} remove={remove}/>;
            })
          }
        </div>
      </div>
    </div>
  );
};
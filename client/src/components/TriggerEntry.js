const React = require('react');
const request = require('./../nRequest.js');

module.exports = function TriggerEntry(props) {
  const dispatch = props.dispatch;
  const interpretationId = props.interpretation.id;
  const triggerId = props.trigger.id;

  const onFocus = function onFocus() {
    const el = arguments[0].currentTarget;
    el.addEventListener('blur', function(event) {
      const newText = event.srcElement.innerText;
      request.editTrigger(interpretationId, triggerId, newText, function() {
        request.get('/api/interpretations', function(data) {
          data = JSON.parse(data);
          dispatch({
            type: 'newState',
            newState: {interpretations: data}
          });
        });
      });
    });
  };

  return (
    <div className='editable-entry inset short'>
      <p onFocus={onFocus} className='flat padleft3' contentEditable>{props.trigger.text}</p>
    </div>
  );
};
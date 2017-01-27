const React = require('react');
const request = require('./../nRequest.js');

module.exports = function ResponseEntry(props) {
  const dispatch = props.dispatch;
  const interpretationId = props.interpretation.id;
  const responseId = props.response.id;
  var listeners = false;

  const onFocus = function onFocus() {
    if (!listeners) {
      listeners = true;
      const el = arguments[0].currentTarget;
      el.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.srcElement.blur();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          event.srcElement.innerText = props.response.text;
          event.srcElement.blur();
        }
      });
      el.addEventListener('blur', function(event) {
        const newText = event.srcElement.innerText;
        if (newText !== props.response.text) {
          request.editResponse(interpretationId, responseId, newText, function() {
            request.get('/api/interpretations', function(data) {
              data = JSON.parse(data);
              dispatch({
                type: 'newState',
                newState: {interpretations: data}
              });
            });
          });
        }
      });
    }
  };

  return (
    <div className='editable-entry inset short'>
      <p onFocus={onFocus} className='flat padleft3' contentEditable>{props.response.text}</p>
    </div>
  );
};
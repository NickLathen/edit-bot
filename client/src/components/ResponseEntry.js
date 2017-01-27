const React = require('react');

module.exports = function ResponseEntry(props) {
  const dispatch = props.dispatch;
  const interpretationId = props.interpretation.Id;
  const responseId = props.response.Id;

  const editResponse = function editResponse() {
    const newText = 'pending';
    const action = {
      type: 'editResponse',
      interpretationId: interpretationId,
      responseId: responseId,
      text: newText
    };
    dispatch(action);
  };

  return (
    <div className='editable-entry inset short'>
      <p className='flat padleft3' contentEditable>{props.response.text}</p>
    </div>
  );
};
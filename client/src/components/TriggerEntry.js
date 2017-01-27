const React = require('react');

module.exports = function TriggerEntry(props) {
  return (
    <div className='editable-entry inset short'>
      <p className='flat' contentEditable>{props.trigger.text}</p>
    </div>
  );
};
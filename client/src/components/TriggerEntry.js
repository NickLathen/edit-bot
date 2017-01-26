const React = require('react');

module.exports = function TriggerEntry(props) {
  return (
    <div>
      <p>{props.trigger.text}</p>
    </div>
  );
};
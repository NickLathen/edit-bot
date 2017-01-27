const React = require('react');

module.exports = function ResponseEntry(props) {
  return (
    <div className='editable-entry inset short'>
      <p className='flat' contentEditable>{props.response.text}</p>
    </div>
  );
};
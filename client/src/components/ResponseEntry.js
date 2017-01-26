const React = require('react');

module.exports = function ResponseEntry(props) {
  return (
    <div>
      <p>{props.response.text}</p>
    </div>
  )
}
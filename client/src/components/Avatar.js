const React = require('react');

module.exports = function Avatar(props) {
  return (
    <img src={props.src} height={'100%'} width={'100%'}/>
  );
};
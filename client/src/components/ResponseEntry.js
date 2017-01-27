const React = require('react');
const ReactDOM = require('react-dom');
const request = require('./../nRequest.js');

module.exports = class ResponseEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const props = this.props;
    const interpretationId = props.interpretation.id;
    const responseId = props.response.id;
    const dispatch = props.dispatch;
    if (responseId === 'new') {
      ReactDOM.findDOMNode(this).children[0].hidden = true;
    }
    var el = ReactDOM.findDOMNode(this).children[1];
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
            event.srcElement.innerText = '';
            dispatch({
              type: 'newState',
              newState: {interpretations: data}
            });
          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }


  render() {
    const props = this.props;
    return (
      <div className='editable-entry inset short'>
        <button className='xButton'></button>
        <p className='flat padleft3' contentEditable>{props.response.text}</p>
      </div>
    );
  }
};
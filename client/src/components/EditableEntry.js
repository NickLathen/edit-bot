const React = require('react');
const ReactDOM = require('react-dom');

module.exports = class EditableEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.id;
    const initialText = this.props.initialText;
    const edit = this.props.edit;
    const remove = this.props.remove;
    
    const xButton = ReactDOM.findDOMNode(this).children[0];
    if (id === 'new') {
      xButton.hidden = true;
    }
    xButton.addEventListener('click', function(event) {
      remove();
    });

    const element = ReactDOM.findDOMNode(this).children[1];
    element.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.srcElement.blur();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        event.srcElement.innerText = initialText;
        event.srcElement.blur();
      }
    });
    element.addEventListener('blur', function(event) {
      const newText = event.srcElement.innerText;
      if (newText !== initialText) {
        edit(newText, element);   
      }
    });
  }


  render() {
    const props = this.props;
    return (
      <div className='editable-entry inset short'>
        <button className='xButton'></button>
        <p className='flat padleft3' contentEditable>{props.initialText}</p>
      </div>
    );
  }
};
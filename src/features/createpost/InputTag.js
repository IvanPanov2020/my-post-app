import React from "react";
import "./inputtag.scss";

class InputTag extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tags: []
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.basicValue !== prevProps.basicValue) {
      this.setState({ tags: this.props.basicValue });
    }
  }

  removeTag = (i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    this.props.setValue(newTags);
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === ' ' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      if (this.state.tags.length === 3) {
        this.tagInput.value = null;
        return;
      }
      this.setState({ tags: [...this.state.tags, val.replace(",", "")]});
      this.props.setValue([...this.state.tags, val.replace(",", "")]);
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }

  render() {
    const { tags } = this.state;

    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
            </li>
          ))}
          {this.state.tags.length < 3 && 
            <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
          }
        </ul>
      </div>
    );
  }
}
export default InputTag;
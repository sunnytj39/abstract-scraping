import { Component } from 'react'
import { connect } from 'react-redux'

class Form extends Component {

  submit(e) {
    this.props.onClick(this.refs.inputText.value);
  }

  render() {
    return (
      <form>
        <input type="text" defaultValue="" ref="inputText" />
        <button onClick={this.submit.bind(this)}>submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onClick: inputText => dispatch(changeText(inputText))
})

export default connect(
  mapDispatchToProps,
)(Form)

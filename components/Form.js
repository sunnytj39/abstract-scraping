import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeText } from '../store'

class Form extends Component {
  handleChange = e => {
    changeText(e.target.value)
  }

  submit() {
    alert('submit')
  }

  render () {
    const { inputText } = this.props
    return (
      <form>
        <input type="text" value={inputText} onChange={this.handleChange} />
        <button onClick={this.submit}>submit</button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  const {inputText} = state
  return {inputText}
}

function mapDispatchToProps (dispatch) {
  return {
    changeText: inputText => dispatch(changeText(inputText))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)

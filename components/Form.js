import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeText } from '../store'

class Form extends Component {
  handleChange = e => {
    const { changeText } = this.props
    changeText(e.target.value)
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

const mapStateToProps = state => ({
  inputText: state.inputText
})

const mapDispatchToProps = dispatch => ({
  changeText: text => dispatch(changeText(text))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)

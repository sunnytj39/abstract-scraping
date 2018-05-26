import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeText } from '../store'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { changeText } = this.props
    changeText(e.target.value)
  }

  async getTitle(e) {
    e.preventDefault()
    console.log('fetch start')
    const response = await fetch('http://localhost:3001/get_title', {
      mode: 'cors',
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    const json = await response.json()
    console.log(json)
  }

  render () {
    const { inputText } = this.props
    return (
      <form>
        <input type="text" value={inputText} onChange={this.handleChange} />
        <button onClick={this.getTitle}>submit</button>
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

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeText, addTitleList, addAbstract } from '../store'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.getTitle = this.getTitle.bind(this)
  }

  handleChange(e) {
    const { changeText } = this.props
    changeText(e.target.value)
  }

  async getTitle(e) {
    e.preventDefault()
    console.log('fetch start')
    const response = await fetch('http://localhost:3001/get_title', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(this.props.inputText),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    console.log(json)
    const { addTitleList, addAbstract } = this.props
    addTitleList(json)
    addAbstract('')
  }
  

  render () {
    const { inputText } = this.props
    return (
      <form>
        <input type="text" value={inputText} onChange={this.handleChange} />
        <button onClick={this.getTitle}>search</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  inputText: state.inputText
})

const mapDispatchToProps = dispatch => ({
  changeText: text => dispatch(changeText(text)),
  addTitleList: list => dispatch(addTitleList(list)),
  addAbstract: abstract => dispatch(addAbstract(addAbstract))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)

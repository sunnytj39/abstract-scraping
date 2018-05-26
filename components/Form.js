import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeText, addTitleList, addAbstract, loading } from '../store'
import styled from 'styled-components'

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
    const { addTitleList, addAbstract, loading } = this.props
    loading(true)
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
    loading(false)
    addTitleList(json)
    addAbstract('')
  }
  

  render () {
    const { inputText } = this.props
    return (
      <Wrapper>
        <input type="text" value={inputText} onChange={this.handleChange} />
        <div onClick={this.getTitle}>search</div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  input {
    height: 32px;
    background-color: transparent;
    border: solid 2px #666;
    font-size: 16px;
    color: #666;
    outline: none;
    border-radius: 3px;
    padding: 1px 10px;
    margin: 0 10px;
    width: 65%;
  }
  div {
    cursor: pointer;
    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: #666;
    border: solid 2px #666;
    border-radius: 3px;
    transition: .4s;
  }
  div:hover {
    background: #666;
    color: white;
  }
`;

const mapStateToProps = state => ({
  inputText: state.inputText
})

const mapDispatchToProps = dispatch => ({
  changeText: text => dispatch(changeText(text)),
  addTitleList: list => dispatch(addTitleList(list)),
  addAbstract: abstract => dispatch(addAbstract(addAbstract)),
  loading: flag => dispatch(loading(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)

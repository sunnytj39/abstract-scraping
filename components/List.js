import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAbstract, loading } from '../store'
import styled from 'styled-components'

class List extends Component {
  constructor(props) {
    super(props)
    this.getAbstract = this.getAbstract.bind(this)
  }
  
  async getAbstract(e) {
    e.preventDefault()
    console.log('fetch start')
    const { addAbstract, loading } = this.props
    loading(true)
    const response = await fetch('http://localhost:3001/get_abstract', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(e.target.id),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    loading(false)
    if(json.length == null) {
      addAbstract('abstractが見つかりませんでした')
    } else {
      addAbstract(json[0]['translations'][0]['text'])
    }
  }

  render () {
    const { titleList } = this.props
    return (
      <Wrapper>
        <h2>Title List</h2>
        <ul>
          {Object.keys(titleList[0]).map(key =>
            <li key={key}><a href='#' id={titleList[1][key]} onClick={this.getAbstract}> {titleList[0][key]}</a> <a href={titleList[1][key]}> <span>> 論文を読む</span></a></li>
          )}
        </ul>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  color: #666;
  a {
    text-decoration: none;
    color: purple;
    span {
      color: #666;
    }
  }
`;

const mapStateToProps = state => ({
  titleList: state.titleList
})

const mapDispatchToProps = dispatch => ({
  addAbstract: abstract => dispatch(addAbstract(abstract)),
  loading: flag => dispatch(loading(flag))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

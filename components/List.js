import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAbstract } from '../store'

class List extends Component {
  constructor(props) {
    super(props)
    this.getAbstract = this.getAbstract.bind(this)
  }
  
  async getAbstract(e) {
    e.preventDefault()
    console.log('fetch start')
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
    console.log(json[0]['translations'][0]['text'])
    const { addAbstract } = this.props
    addAbstract(json[0]['translations'][0]['text'])
  }

  render () {
    const { titleList } = this.props
    return (
      <div>
        <h2>Title List</h2>
        {Object.keys(titleList[0]).map(key =>
          <p key={key}><a href='#' id={titleList[1][key]} onClick={this.getAbstract}> 「{titleList[0][key]}」</a></p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  titleList: state.titleList
})

const mapDispatchToProps = dispatch => ({
  addAbstract: abstract => dispatch(addAbstract(abstract))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

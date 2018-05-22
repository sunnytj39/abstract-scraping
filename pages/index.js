import React from 'react'
import {connect} from 'react-redux'
import App from '../components/App'

class Index extends React.Component {
  render () {
    return (
      <App />
    )
  }
}

export default connect()(Index)

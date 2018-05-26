import React, { Component } from 'react'
import { connect } from 'react-redux'

const Abstract = ({ abstract }) => (
  <div>
    <h2>Abstract</h2>
    {abstract}
  </div>
)
const mapStateToProps = state => ({
  abstract: state.abstract
})

export default connect(mapStateToProps)(Abstract)

import { connect } from 'react-redux'

const List = text => (
  <div>
    {text}
  </div>
)

const mapStateToProps = state => ({
  text: state.text
})

export default connect({
  mapStateToProps
})(List)

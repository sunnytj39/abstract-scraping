import { connect } from 'react-redux'

const List = ({list}) => (
  <div>
    {Object.keys(list).map(key =>
      <div key={key}>{list[key]}</div>
    )}
  </div>
)

const mapStateToProps = state => ({
  list: state.list
})

export default connect(mapStateToProps)(List)

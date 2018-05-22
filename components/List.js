import { connect } from 'react-redux'

const List = ({list}) => (
  <div>
    {Object.keys(list).map(key =>
      <div key={key}>{list[key]}</div>
    )}
  </div>
)

function mapStateToProps (state) {
  const {list} = state
  return {list}
}

export default connect(mapStateToProps)(List)

import { connect } from 'react-redux'

const List = ({titleList}) => (
  <div>
    {Object.keys(titleList[0]).map(key =>
      <div key={key}> 「{titleList[0][key]}」</div>
    )}
  </div>
)

const mapStateToProps = state => ({
  titleList: state.titleList
})

export default connect(mapStateToProps)(List)

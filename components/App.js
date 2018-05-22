import {connect} from 'react-redux'
import Form from './Form'
import List from './List'

const App = ({ lastUpdate, light }) => {
  return (
    <div>
      <Form />
      <List />
    </div>
  )
}

const mapStateToProps = state => ({
  inputText: state.inputText
})

export default connect(mapStateToProps)(App)

import {connect} from 'react-redux'
import Form from './Form'
import List from './List'
import Abstract from './Abstract'

const App = ({ lastUpdate, light }) => {
  return (
    <div>
      <h1>Abstract Scraping</h1>
      <Form />
      <List />
      <Abstract />
    </div>
  )
}

const mapStateToProps = state => ({
  inputText: state.inputText
})

export default connect(mapStateToProps)(App)

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './App'

const store = createStore(rootReucer)

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Index

import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../redux/reducers'
import App from '../components/App'

const store = createStore(rootReducer)

const Index = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Index

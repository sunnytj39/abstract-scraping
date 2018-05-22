import { createStore } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  inputText: 'initial text',
  list: ['hello', 'react' ,'redux']
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, {
        inputText: action.inputText
      })
    case 'ADD_LIST':
      return Object.assign({}, state, {
        list: action.list
      })
    default: return state
  }
}

// ACTIONS
export const changeText = text => ({ 
  type: 'CHANGE_TEXT',
  inputText: text
})

export const addList = () => ({ 
  type: 'ADD_LIST' 
})

export function initializeStore (initialState = initialState) {
  return createStore(reducer, initialState, composeWithDevTools())
}

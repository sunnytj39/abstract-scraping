import { createStore } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  inputText: 'initial text',
  titleList: [[]],
  abstract: '',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, {
        inputText: action.inputText
      })
    case 'ADD_TITLE_LIST':
      return Object.assign({}, state, {
        titleList: action.titleList
      })
    case 'ADD_ABSTRACT':
      return Object.assign({}, state, {
        abstract: action.abstract
      })
    default: return state
  }
}

// ACTIONS
export const changeText = inputText => ({ 
  type: 'CHANGE_TEXT',
  inputText: inputText
})

export const addTitleList = titleList => ({ 
  type: 'ADD_TITLE_LIST',
  titleList: titleList
})

export const addAbstract = abstract => ({
  type: 'ADD_ABSTRACT',
  abstract: abstract
})

export function initializeStore (initialState = initialState) {
  return createStore(reducer, initialState, composeWithDevTools())
}

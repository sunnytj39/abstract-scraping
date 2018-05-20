const scraping = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return [
        ...state,
        {
          text: action.text
        }
      ]
    default:
      return state
  }
}

export default scraping

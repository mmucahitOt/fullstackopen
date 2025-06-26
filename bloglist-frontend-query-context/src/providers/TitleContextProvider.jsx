import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const TitleContext = createContext()

const titleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.payload
    case 'REMOVE_TITLE':
      return ''
    default:
      return state
  }
}

export const TitleContextProvider = ({ children }) => {
  const [title, titleDispatch] = useReducer(titleReducer, null)

  const handleTitle = (title) => {
    console.log('handleTitle', title)
    titleDispatch({ type: 'SET_TITLE', payload: title })
  }

  const removeTitle = () => {
    titleDispatch({ type: 'REMOVE_TITLE' })
  }

  return (
    <TitleContext.Provider value={{ title, handleTitle, removeTitle }}>
      {children}
    </TitleContext.Provider>
  )
}

TitleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { TitleContext }

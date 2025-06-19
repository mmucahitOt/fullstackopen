import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdotes from './components/FilterAnecdotes'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdotes />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
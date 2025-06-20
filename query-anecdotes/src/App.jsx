import { useEffect, useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState('')

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => {
      return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
    },
    retry: false
  })

  useEffect(() => {
    if (queryResult.isLoading) {
      setNotification('loading data...')
    }
  }, [queryResult.isLoading, setNotification])

  useEffect(() => {
    if (queryResult.isError) {
      setNotification("anecdote service not available due to problems in server")
    }
  }, [queryResult.isError, queryResult.error, setNotification])
  
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification notification={notification} setNotification={setNotification} />
      <AnecdoteForm />
      {queryResult.data && queryResult.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

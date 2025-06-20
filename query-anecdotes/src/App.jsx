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
    if (queryResult.isError) {
      setNotification(queryResult.error.message)
    }
  }, [queryResult.isError, queryResult.error, setNotification])


  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification notification={notification} setNotification={setNotification} />
      <AnecdoteForm setNotification={setNotification} />
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

import { useEffect, useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useState('')

  const voteMutation = useMutation({
    mutationFn: (anecdote) => {
      return anecdoteService.vote(anecdote.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => {
      return anecdoteService.getAll()
    },
    retry: false
  })

  useEffect(() => {
    if (queryResult.isError) {
      setNotification(queryResult.error.message)
    }
  }, [queryResult.isError, queryResult.error, setNotification])

  useEffect(() => {
    if (voteMutation.isError) {
      setNotification(voteMutation.error.response.data.error)
    }
  }, [voteMutation.isError, voteMutation.error, setNotification])

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    setNotification(`you voted for '${anecdote.content}'`)
  }

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

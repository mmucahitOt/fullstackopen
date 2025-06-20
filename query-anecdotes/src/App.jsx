import { useEffect, useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { useNotificationDispatch } from './hooks/useNotification'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: (anecdote) => {
      return anecdoteService.vote(anecdote.id)
    },
    onSuccess: (anecdote) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `you voted for '${anecdote.content}'` })
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      if (error.response.data.error) {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
      }
      else if (error.message) {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.message })
      } else {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'An error occurred' })
      }
    },
  })

  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => {
      return anecdoteService.getAll()
    },
    retry: false,
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
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

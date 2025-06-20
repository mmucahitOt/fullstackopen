import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNotificationDispatch } from '../hooks/useNotification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (anecdote) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `a new anecdote '${anecdote.content}' created!` })
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      if (error.response.data.error) {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
      } else if (error.message) {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: error.message })
      } else {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'An error occurred' })
      }
    },
    retry: false
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
    
  }

  
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  setNotification: PropTypes.func.isRequired
}

export default AnecdoteForm

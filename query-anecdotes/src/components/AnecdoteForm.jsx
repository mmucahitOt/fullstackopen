import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const AnecdoteForm = ({setNotification}) => {
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    retry: false
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    setNotification(`a new anecdote ${content} created!`)
    event.target.anecdote.value = ''
    
  }
  
  useEffect(() => {
    if (newAnecdoteMutation.isError) {
      setNotification(newAnecdoteMutation.error.response.data.error)
    }
  }, [newAnecdoteMutation.isError, newAnecdoteMutation.error, setNotification])

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

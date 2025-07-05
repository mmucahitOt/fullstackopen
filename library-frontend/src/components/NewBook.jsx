import { useState } from 'react'
import { useAddBook, useAllAuthors } from '../graphql'


const NewBook = () => {
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState(undefined)
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const { addBook, loading, error } = useAddBook()
  const { data: authorsData, loading: authorsLoading, error: authorsError } = useAllAuthors()
  
  const submit = async (event) => {
    event.preventDefault()

    addBook({variables: {title, authorId, published: Number(published), genres}, })

    setTitle('')
    setPublished('')
    setAuthorId('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <select value={authorId} onChange={({ target }) => setAuthorId(target.value)}>
            {authorsData.allAuthors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
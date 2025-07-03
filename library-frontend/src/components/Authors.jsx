import { useAllAuthors, useEditAuthor } from "../graphql"
import { useState } from "react"

const Authors = () => {
  const { data, loading, error } = useAllAuthors()
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const { editAuthor, loading: editAuthorLoading, error: editAuthorError } = useEditAuthor()
  if (error) {
    console.log(error)
  }
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  console.log(data)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.author}>
              <td>{a.author}</td>
              <td>{a.born ? a.born : "N/A"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {data.allAuthors.map((a) => (
              <option key={a.author} value={a.author}>{a.author}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors;
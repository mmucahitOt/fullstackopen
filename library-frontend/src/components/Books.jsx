import { useAllBooks } from "../graphql"
const Books = () => {
  const { data, loading, error } = useAllBooks()
  
  if (error) {
    console.log(error)
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (!data) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books

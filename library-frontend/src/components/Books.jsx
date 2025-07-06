import { useAllBooks, useGenres } from "../graphql"
import { useCurrentUser } from "../provider/current-user.hook"
import { useState } from "react"

const Books = () => {
  const {currentUser} = useCurrentUser()
  const { data: booksData, loading, error, genre, setGenre } = useAllBooks()
  const { data: genresData,} = useGenres()

  if (error) {
    console.log(error)
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (!booksData) {
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
          {booksData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
        {
          currentUser && <tfoot>
          <tr>
            <td>
              
                {genresData?.genres?.map((g) => (
                  <button style={{backgroundColor: genre === g ? "lightblue" : "white"}} key={g} onClick={() => genre === g ? setGenre(null) : setGenre(g)}>
                    {g}
                  </button>
                ))}
                {genresData?.genres?.length > 0 && <button style={{backgroundColor: genre === null ? "lightblue" : "white"}} onClick={() => setGenre(null)}>all genres</button>}
             
            </td>
          </tr>
          </tfoot>
        }
      </table>
    </div>
  )
}

export default Books

import { useState, useContext } from 'react'
import BlogForm from './components/BlogForm'
import { BlogContext } from '../../../../providers/BlogContextProvider'

const BlogCreate = () => {
  const { createBlog } = useContext(BlogContext)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <BlogForm
      formTitle="Create Blog"
      formProps={{ onSubmit: handleCreateBlog }}
      buttonText="Create Blog"
      buttonProps={{ type: 'submit' }}
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
    />
  )
}

export default BlogCreate

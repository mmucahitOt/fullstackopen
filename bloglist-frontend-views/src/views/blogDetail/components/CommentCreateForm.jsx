import { useContext, useState } from 'react'
import Form from '../../../components/common/form/Form'
import { BlogContext } from '../../../providers/BlogContextProvider'

const CommentCreateForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const { createComment } = useContext(BlogContext)
  const handleAddComment = () => {
    console.log('handleAddComment', comment)
    createComment({ id: blog.id, comment })
  }

  return (
    <Form
      formProps={{
        onSubmit: handleAddComment,
        style: { display: 'flex', flexDirection: 'row', gap: '10px' },
      }}
      buttonText="Add Comment"
    >
      <input
        placeholder="Add a comment"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </Form>
  )
}

export default CommentCreateForm

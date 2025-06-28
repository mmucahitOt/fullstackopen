import Text from '../../../components/Text'

const BlogComment = ({ comments }) => {
  console.log('Comments data:', comments)
  console.log('Comments type:', typeof comments)
  console.log('Comments length:', comments?.length)

  if (!comments || comments.length === 0) {
    return (
      <div>
        <Text as="h3" style={{ margin: '0' }} text="Comments" />
        <p>No comments yet</p>
      </div>
    )
  }

  return (
    <div>
      <Text as="h3" style={{ margin: '0' }} text="Comments" />
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComment

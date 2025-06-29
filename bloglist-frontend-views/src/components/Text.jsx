const Text = ({ text, as = 'div', style = {}, ...props }) => {
  const Tag = as
  return (
    <Tag style={style} {...props} className="text-primary">
      {text}
    </Tag>
  )
}

export default Text

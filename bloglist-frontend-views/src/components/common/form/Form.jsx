const Form = ({ children, formTitle, formProps, buttonText, buttonProps }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    formProps.onSubmit(e)
  }
  return (
    <div>
      <form {...formProps}>
        <h3>{formTitle}</h3>
        {children}
        <div>
          <button type="submit" {...buttonProps} onClick={handleSubmit}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form

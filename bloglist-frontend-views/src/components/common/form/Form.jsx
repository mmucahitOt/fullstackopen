const Form = ({ children, formTitle, formProps, buttonText, buttonProps }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    formProps.onSubmit(e)
  }
  return (
    <div className="container">
      <form {...formProps} className="form-group">
        <h3 className="form-label">{formTitle}</h3>
        {children}
        <div className="d-flex justify-content-end">
          <button type="submit" {...buttonProps} onClick={handleSubmit}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form

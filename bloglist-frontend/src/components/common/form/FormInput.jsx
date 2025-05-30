const FormInput = ({ inputDivProps, inputProps }) => {
  const { label, type, name, value, onChange } = inputProps
  return (
    <div {...inputDivProps}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default FormInput

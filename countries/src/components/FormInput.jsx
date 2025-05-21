const FormInput = ({ label, value, onChange }) => {
  return (
    <div>
      {label}: <input value={value} onChange={onChange} aria-label={label} />
    </div>
  );
};

export default FormInput;

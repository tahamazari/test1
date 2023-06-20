const Input = ({ className, value, onChange, placeholder }) => {
  return(
    <input 
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Input
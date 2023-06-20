const Button = ({ label, className, onClick, disabled }) => {
  return(
    <button className={className} disabled={disabled} onClick={onClick}>{label}</button>
  )
}

export default Button
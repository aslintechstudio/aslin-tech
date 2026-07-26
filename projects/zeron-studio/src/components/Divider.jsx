function Divider({ className = '', ...props }) {
  return <hr className={`divider ${className}`.trim()} {...props} />
}

export default Divider

function CursorLabel({ children, className = '', ...props }) {
  return (
    <span className={`cursor-label ${className}`.trim()} aria-hidden="true" {...props}>
      {children}
    </span>
  )
}

export default CursorLabel

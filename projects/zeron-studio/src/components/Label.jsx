function Label({ children, as: Element = 'span', className = '', ...props }) {
  return (
    <Element className={`label ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}

export default Label

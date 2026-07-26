function Grid({
  children,
  as: Element = 'div',
  className = '',
  ...props
}) {
  return (
    <Element className={`editorial-grid ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}

export default Grid

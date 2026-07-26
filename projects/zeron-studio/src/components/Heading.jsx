function Heading({
  children,
  as: Element = 'h2',
  size = 'display-md',
  family = 'sans',
  className = '',
  ...props
}) {
  return (
    <Element
      className={`type-${size} type-${family} ${className}`.trim()}
      {...props}
    >
      {children}
    </Element>
  )
}

export default Heading

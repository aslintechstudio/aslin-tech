function Text({
  children,
  as: Element = 'p',
  size = 'body',
  family = 'serif',
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

export default Text

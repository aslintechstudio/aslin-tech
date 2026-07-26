function Container({ children, as: Element = 'div', size = 'wide', className = '' }) {
  return (
    <Element className={`container container--${size} ${className}`.trim()}>
      {children}
    </Element>
  )
}

export default Container

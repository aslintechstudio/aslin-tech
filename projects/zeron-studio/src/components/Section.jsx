import Container from './Container'

function Section({
  children,
  as: Element = 'section',
  contained = true,
  containerSize = 'wide',
  className = '',
  ...props
}) {
  const content = contained ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  )

  return (
    <Element className={`section ${className}`.trim()} {...props}>
      {content}
    </Element>
  )
}

export default Section

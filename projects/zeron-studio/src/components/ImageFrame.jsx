function ImageFrame({
  children,
  as: Element = 'figure',
  ratio = 'landscape',
  className = '',
  ...props
}) {
  return (
    <Element
      className={`image-frame image-frame--${ratio} ${className}`.trim()}
      {...props}
    >
      {children}
    </Element>
  )
}

export default ImageFrame

function PageWrapper({ children, className = '' }) {
  return (
    <main className={`page-wrapper ${className}`.trim()} id="main-content">
      {children}
    </main>
  )
}

export default PageWrapper

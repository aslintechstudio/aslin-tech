function MainLayout({ children, className = '' }) {
  return <div className={`site-shell ${className}`.trim()}>{children}</div>
}

export default MainLayout

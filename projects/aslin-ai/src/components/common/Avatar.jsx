function Avatar({ initials, name }) {
  return (
    <span className="avatar" aria-label={name} title={name}>
      {initials}
    </span>
  )
}

export default Avatar

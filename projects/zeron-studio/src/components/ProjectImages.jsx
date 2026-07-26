function ProjectImage({ image, caption, projectTitle, archiveLabel, className, priority = false }) {
  return (
    <figure className={`contact-fragment ${className}`}>
      <img
        src={image.url}
        alt={image.alt}
        style={{ objectPosition: image.position }}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <figcaption>
        <span>{caption}</span>
        <span>{projectTitle} {archiveLabel}</span>
      </figcaption>
    </figure>
  )
}

function ProjectImages({ images, projectTitle, archiveLabel, language }) {
  const englishCaptions = [
    'Image 01 / Exterior',
    'Image 02 / Facade Detail',
    'Image 03 / Interior',
    'Image 04 / Material',
  ]

  return (
    <>
      {images.map((image, index) => (
        <ProjectImage
          className={`contact-fragment--${String.fromCharCode(97 + index)}`}
          image={image}
          caption={language === 'en' ? englishCaptions[index] : image.caption}
          projectTitle={projectTitle}
          archiveLabel={archiveLabel}
          key={image.url}
          priority={index === 0}
        />
      ))}
    </>
  )
}

export default ProjectImages

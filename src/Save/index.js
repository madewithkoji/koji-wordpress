const Save = ({ className, attributes }) => {
  const { link, button } = attributes

  if (!link) {
    return null // if link not provided
  }

  //<RichText.Content tag={'p'} value={title} /> for custom formatting

  return (
    <div className={className}>
      <div className="koji-embed-button" data-koji={link}>
        {button}
      </div>
    </div>
  )
}

export default Save

import classnames from "classnames"

const Save = ({ className, attributes }) => {
  const { link, button, alignment, color } = attributes

  if (!link) {
    return null // if link not provided
  }

  //<RichText.Content tag={'p'} value={title} /> for custom formatting

  return (
    <div className={className}>
      <div
        className={classnames(
          "koji-embed-button",
          `koji-embed-button-${alignment}`
        )}
        style={{ background: color }}
        data-koji={link}
      >
        {button}
      </div>
    </div>
  )
}

export default Save

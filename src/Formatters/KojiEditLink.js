import { RichTextToolbarButton } from "@wordpress/block-editor"

const KojiEditLink = () => {
  return (
    <RichTextToolbarButton
      icon="editor-code"
      title="Sample output"
      onClick={() => {
        console.log("toggle format")
      }}
    />
  )
}

export default KojiEditLink

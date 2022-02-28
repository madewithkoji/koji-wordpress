import styled from "styled-components"
import { useEffect } from "react"

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`

const AppStoreIframe = ({ onAppCreated, onCancel }) => {
  useEffect(() => {
    window.addEventListener("message", ({ data }) => {
      try {
        // Filter events we don't care about
        if (
          !data._kojiEventName ||
          !data._kojiEventName.startsWith("@@koji_sdk/create/")
        ) {
          return
        }

        const event = data._kojiEventName.replace("@@koji_sdk/create/", "")

        if (event === "LOADED") {
          // Embedded create loaded
          //alert("Iframe loaded")
        }

        if (event === "DISMISS") {
          // User dismissed embedded experience
          onCancel()
        }

        if (event === "APP_CREATED") {
          const { url } = data.payload
          // A Koji App was created
          onAppCreated(url)
        }
      } catch (err) {
        //
        alert(err.message)
      }
    })
  }, [])

  return (
    <Iframe
      src={`https://withkoji.com/_embeds/create`}
      title="Koji App Store"
      frameBorder="0"
      allowFullScreen
    />
  )
}

export default AppStoreIframe

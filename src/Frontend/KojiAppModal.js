import Screen from "../Components/Modals/Screen"
import styled from "styled-components"
import { useState } from "react"

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  background: black;
`

const KojiAppModal = ({ url, onClose }) => {
  const [show, setShow] = useState(true)

  return show ? (
    <Screen
      key="Test"
      title=""
      onCancel={() => {
        setShow(false)

        setTimeout(() => {
          onClose()
        }, 300)
      }}
      onDidAppear={() => null}
      onSetModalIsPresent={() => null}
      dismissOnBackgroundClick={true}
      transition={"wordpress-plugin-custom"}
      preventScroll
    >
      <Iframe
        src={`${url}?__presentation-style=embed`}
        title="Koji App"
        frameBorder="0"
        allowFullScreen
      />
    </Screen>
  ) : null
}

export default KojiAppModal

import Screen from "../Components/Modals/Screen"
import styled from "styled-components"
import { useState } from "react"
import CloseBlackIcon from "./CloseBlackIcon"
import ExternalLinkIcon from "./ExternalLinkIcon"

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  background: black;
`

const CloseIconContainer = styled.div`
  > svg {
    width: 23px;
    height: 23px;
  }
`

const ActionIconContainer = styled.a`
  > svg {
    width: 20px;
    height: 20px;
  }
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
      navigationLeftContent={
        <CloseIconContainer>
          <CloseBlackIcon />
        </CloseIconContainer>
      }
      actionItem={
        <ActionIconContainer href={url} target="_blank">
          <ExternalLinkIcon />
        </ActionIconContainer>
      }
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

import React from "react"
import { createGlobalStyle } from "styled-components"

const BlockScrollComponent = createGlobalStyle`
body {
  overflow: hidden;
  padding-right: 8px;
  @media ${({ theme }) => theme.breakpoints.phone} {
    padding-right: 0;
  }
}

html, body {
  overscroll-behavior-x: none!important;
  touch-action: none;
}
`

const BlockScroll = () => {
  // always block scroll
  //const blockScroll = document.body.scrollHeight > document.body.offsetHeight
  const blockScroll = true

  return blockScroll ? <BlockScrollComponent /> : <React.Fragment />
}

export default BlockScroll

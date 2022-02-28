import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Portal } from "react-portal"
import { motion, AnimatePresence } from "framer-motion"

import Breakpoints from "./_helpers/Breakpoints"
import BlockScroll from "./_helpers/BlockScroll"
import GlobalTheme from "./_helpers/GlobalTheme"

export const ExportableContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);

  height: -webkit-fill-available;
  min-height: -webkit-fill-available;
  max-height: -webkit-fill-available;

  background-color: rgba(0, 0, 0, 0);

  display: flex;
  align-items: center;
  z-index: 9999;

  ${({ presentsInContext }) =>
    presentsInContext &&
    `
    position: absolute;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
  `}
`

export const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0);

  display: flex;
  align-items: center;
  z-index: ${({ alwaysOnTop }) => (alwaysOnTop ? 99999 : 9999)};

  ${({ presentsInContext }) =>
    presentsInContext &&
    `
    position: absolute;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
  `}
`

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;

  ${({ hideBackground }) => hideBackground && "display: none;"}
  @media ${Breakpoints.phone} {
    display: flex;
  }
`

export const ModalContainer = styled(motion.div)`
  z-index: 2;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ origin }) => `transform-origin: ${origin};`}

  position: fixed;
  top: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);

  height: -webkit-fill-available;
  min-height: -webkit-fill-available;
  max-height: -webkit-fill-available;

  ${({ presentsInContext }) =>
    presentsInContext &&
    `
    position: absolute;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
  `}
`

const Inner = styled.div`
  ${({ theme }) => theme.mixins.styledScrollbar}
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;

  position: relative;
  ${({ anchor }) => {
    if (!anchor) {
      return ""
    }

    const { top, left, right, bottom } = anchor
    const constraints = ["position: absolute;"]
    if (top) {
      constraints.push(`top: ${top}px;`)
    }
    if (left) {
      constraints.push(`left: ${left}px;`)
    }
    if (right) {
      constraints.push(`right: ${right}px;`)
    }
    if (bottom) {
      constraints.push(`bottom: ${bottom}px;`)
    }

    return constraints.join("\n")
  }}

  box-shadow: 0 0 24px 4px rgba(0,0,0,0.4);
  border-radius: 13px;

  @media ${Breakpoints.phone} {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;

    box-shadow: none;

    border-radius: 0;
    ${({ modalStyle }) =>
      modalStyle === "rounded" &&
      `
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      overflow: hidden;
  `}

    ${({ mobilePresentation }) =>
      mobilePresentation === "bottom" &&
      `
      width: 100%;
      margin: unset;
      margin-top: auto;
  `}
  }
`

const Modal = (props) => {
  const {
    children,
    dismissOnBackgroundClick,
    onRequestClose,
    mobilePresentation,
    alwaysOnTop,
    transition,
    anchor,
    noBackdrop,
    noAnimation,

    isVisible,
    handlesTransition,
    presentsInContext,
    onDidAppear,
    modalStyle,
    controlledAnimation,
    animationIsActive,
  } = props

  let animationInitial = { scale: 1 }
  let animationActive = { scale: 1, opacity: 1 }
  let duration = 0
  let backgroundDuration = 0

  if (window.innerWidth < 768) {
    backgroundDuration = 0.1

    if (mobilePresentation === "alert") {
      duration = 0.2
      animationInitial = { scale: 0.8 }
      animationActive = {
        scale: 1,
      }
    } else if (transition === "push") {
      duration = 0.3
      animationInitial = { x: "100%" }
      animationActive = {
        x: 0,
      }
    } else {
      duration = 0.3
      animationInitial = { y: "100%" }
      animationActive = {
        y: 0,
      }
    }
  }

  if (transition === "wordpress-plugin-custom") {
    animationInitial = { scale: 0 }
    duration = 0.3
    animationActive = { scale: 1, opacity: 1 }
  }

  if (noAnimation) {
    animationInitial = {}
    animationActive = {}
  }

  let backgroundAnimationActive = { opacity: 0.3 }
  if (window.innerWidth > 768) {
    backgroundAnimationActive = { opacity: 0.7 }
  }

  // Block the animation if its controlled by a parent component
  if (controlledAnimation && !animationIsActive) {
    animationActive = { opacity: 0 }
    backgroundAnimationActive = { opacity: 0 }

    if (window.innerWidth < 768) {
      if (mobilePresentation === "alert") {
        animationActive = { scale: 0 }
      } else if (transition === "push") {
        animationActive = { x: " 100%" }
      } else {
        animationActive = { y: "100%" }
      }
    }
  }

  let modal = (
    <React.Fragment>
      <BlockScroll />
      <Container
        presentsInContext={presentsInContext}
        alwaysOnTop={alwaysOnTop}
      >
        {!noBackdrop && transition !== "push" && (
          <Background
            key="modal-background"
            initial={{ opacity: 0 }}
            animate={backgroundAnimationActive}
            exit={{ opacity: 0 }}
            transition={{ duration: backgroundDuration, ease: "easeInOut" }}
            hideBackground={!!anchor}
          />
        )}
        <ModalContainer
          key="modal-container"
          onMouseDown={() => {
            if (dismissOnBackgroundClick) {
              onRequestClose()
            }
          }}
          onTouchEnd={() => {
            if (dismissOnBackgroundClick) {
              onRequestClose()
            }
          }}
          initial={animationInitial}
          animate={animationActive}
          exit={animationInitial}
          transition={{ duration, ease: "easeOut" }}
          origin={anchor && anchor.origin}
          presentsInContext={presentsInContext}
          onAnimationComplete={() => {
            if (onDidAppear) {
              onDidAppear()
            }
          }}
        >
          <Inner
            key="modal-inner"
            mobilePresentation={mobilePresentation}
            modalStyle={modalStyle}
            anchor={anchor}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
            }}
          >
            {React.Children.toArray(children)}
          </Inner>
        </ModalContainer>
      </Container>
    </React.Fragment>
  )

  if (!handlesTransition) {
    modal = <AnimatePresence>{isVisible && modal}</AnimatePresence>
  }

  if (presentsInContext) {
    return modal
  }

  return <Portal>{modal}</Portal>
}

Modal.propTypes = {
  children: PropTypes.node,
  dismissOnBackgroundClick: PropTypes.bool,
  isVisible: PropTypes.bool,
  alwaysOnTop: PropTypes.bool,
  onRequestClose: PropTypes.func,
  mobilePresentation: PropTypes.string,
  modalStyle: PropTypes.string,
  transition: PropTypes.string,
  anchor: PropTypes.object,
  noBackdrop: PropTypes.bool,
  noAnimation: PropTypes.bool,
  presentsInContext: PropTypes.bool,
  handlesTransition: PropTypes.bool,
  onDidAppear: PropTypes.func,
  controlledAnimation: PropTypes.bool,
  animationIsActive: PropTypes.bool,
}

const ThemedModal = (props) => {
  return (
    <GlobalTheme>
      <Modal {...props} />
    </GlobalTheme>
  )
}

export default ThemedModal

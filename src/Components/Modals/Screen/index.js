import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import RawModal from "../Scaffold"
import NavigationBar, { navbarHeight } from "./_components/NavigationBar"
import Breakpoints from "../_helpers/Breakpoints"

//import FullscreenLoading from "components/Common/FullscreenLoading"
const FullscreenLoading = styled.div``

export const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors["background.default"]};
  color: ${({ theme }) => theme.colors["foreground.default"]};

  max-width: 90vw;
  max-height: 90vh;

  border-radius: 13px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors["border.default"]};

  @media ${Breakpoints.phone} {
    box-shadow: none;
    border: none;

    width: 100%;
    min-width: 100%;
    max-width: 100%;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    max-height: calc(100vh - 26px);
    max-height: calc(var(--vh, 1vh) * 100 - 26px);

    ${({ fullHeight }) =>
      fullHeight &&
      `
      height: calc(100vh - 26px);
      height: calc(var(--vh, 1vh) * 100 - 26px);
    `}

    ${({ isEmbedded }) =>
      isEmbedded &&
      `
      max-height: 100vh;
      max-height: calc(var(--vh, 1vh) * 100);
    `}
  }
`

export const OuterContainer = styled(Container)`
  overflow: hidden;
  width: 500px;
  height: 700px;

  @media ${({ theme }) => theme.breakpoints.phone} {
    width: 100%;
    height: calc(100vh - 26px);
    height: calc(var(--vh, 1vh) * 100 - 26px);

    ${({ isFullHeight }) =>
      isFullHeight &&
      `
      height: 100vh;
      min-height: 100vh;
      max-height: 100vh;

      height: calc(var(--vh, 1vh) * 100);
      min-height: calc(var(--vh, 1vh) * 100);
      max-height: calc(var(--vh, 1vh) * 100);
    `}
  }

  border: none;
  background: ${({ defaultBackground, theme }) =>
    defaultBackground
      ? theme.colors["background.default"]
      : theme.colors["background.alt"]};

  -webkit-mask-image: -webkit-radial-gradient(white, black);
  ${({ isFullHeight }) =>
    !isFullHeight &&
    `
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
  `}
`

export const ScrollContainer = styled(motion.div)`
  overflow: auto;
  width: 500px;
  height: 700px;
  @media ${({ theme }) => theme.breakpoints.phone} {
    width: 100%;
    height: 100%;
  }

  padding-top: ${({ hideNavigationBar }) =>
    hideNavigationBar ? 0 : navbarHeight};

  -webkit-mask-image: -webkit-radial-gradient(white, black);
  ${({ isFullHeight }) =>
    !isFullHeight &&
    `
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
  `}

  ${({ preventScroll }) =>
    preventScroll &&
    `
  overflow: hidden;
`}
`

const InactiveOverlay = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000000;
`

const ScrollShim = styled.div`
  width: 100%;
  display: block;
  height: ${navbarHeight};

  @media ${({ theme }) => theme.breakpoints.phone} {
    height: 60vh;
  }
`

class Screen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasAppeared: window.innerWidth > 768,
    }

    this.scrollContainerRef = React.createRef()
    this.scrollOffset = 0

    this.appearanceTimeout = null
  }

  componentDidMount() {
    if (!this.props.transition) {
      this.props.onSetModalIsPresent(true)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isInactive && !this.props.isInactive) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasAppeared: true }, () => {
        if (this.scrollOffset) {
          this.scrollContainerRef.current.scrollTop = this.scrollOffset
        }
      })
    }

    if (!prevProps.isInactive && this.props.isInactive) {
      this.scrollOffset = this.scrollContainerRef.current.scrollTop
    }
  }

  onDismiss() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    } else if (this.props.onDismiss) {
      this.props.onDismiss()
    } else if (this.props.onCancel) {
      this.props.onCancel()
    }

    if (!this.props.transition) {
      this.props.onSetModalIsPresent(false)
    }
  }

  // Catch unhandled unmounts
  componentWillUnmount() {
    if (!this.props.transition) {
      this.props.onSetModalIsPresent(false)
    }

    if (this.appearanceTimeout) {
      clearTimeout(this.appearanceTimeout)
    }
  }

  render() {
    const {
      title,
      children,
      onRequestClose,
      onDismiss,
      onCancel,
      transition,
      onAction,
      actionItem,
      isInactive,
      fixedHeightContainer,
      adjacentChildren,
      onDidAppear,
      hideNavigationBar,
      seamlessNavigationBar,
      defaultBackground,
      isLoading,
      isFullHeight,
      preventScroll,
      navigationLeftContent,
      ...props
    } = this.props

    const { hasAppeared } = this.state

    let inner = children
    if (!hasAppeared) {
      inner = <FullscreenLoading />
      if (isInactive) {
        inner = null
      }
    }

    if (isLoading) {
      inner = <FullscreenLoading />
    }

    const containerIsFullHeight = false

    return (
      <RawModal
        onRequestClose={() => this.onDismiss()}
        mobilePresentation="bottom"
        modalStyle={containerIsFullHeight ? null : "rounded"}
        handlesTransition
        transition={transition}
        onDidAppear={() => {
          this.appearanceTimeout = setTimeout(
            () =>
              this.setState({ hasAppeared: true }, () => {
                if (onDidAppear) {
                  onDidAppear()
                }
              }),
            500
          )
        }}
        isInactive={isInactive}
        {...props}
      >
        {!hideNavigationBar && (
          <NavigationBar
            name={title}
            onBack={
              onRequestClose
                ? () => {
                    this.onDismiss()
                  }
                : undefined
            }
            onClose={
              onDismiss
                ? () => {
                    this.onDismiss()
                  }
                : undefined
            }
            onCancel={
              onCancel
                ? () => {
                    this.onDismiss()
                  }
                : undefined
            }
            onAction={onAction}
            actionItem={actionItem}
            isSeamless={seamlessNavigationBar}
            isFullHeight={containerIsFullHeight}
            leftContent={navigationLeftContent}
          />
        )}
        <OuterContainer
          defaultBackground={defaultBackground}
          isFullHeight={containerIsFullHeight}
        >
          <ScrollContainer
            initial={false}
            animate={{
              x: isInactive && window.innerWidth < 768 ? -100 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (isInactive) {
                this.setState({ hasAppeared: false })
              }
            }}
            hideNavigationBar={hideNavigationBar}
            ref={this.scrollContainerRef}
            isFullHeight={containerIsFullHeight}
            preventScroll={preventScroll}
          >
            {inner}
            {!fixedHeightContainer && <ScrollShim />}
          </ScrollContainer>
          <AnimatePresence>
            {isInactive && window.innerWidth < 768 && (
              <InactiveOverlay
                key="InactiveOverlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </OuterContainer>
        {adjacentChildren}
      </RawModal>
    )
  }
}

Screen.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
  onRequestClose: PropTypes.func,
  onDismiss: PropTypes.func,
  onCancel: PropTypes.func,
  transition: PropTypes.string,
  onAction: PropTypes.func,
  actionItem: PropTypes.any,
  isInactive: PropTypes.bool,
  fixedHeightContainer: PropTypes.bool,
  adjacentChildren: PropTypes.any,
  onDidAppear: PropTypes.func,
  onSetModalIsPresent: PropTypes.func,
  hideNavigationBar: PropTypes.bool,
  seamlessNavigationBar: PropTypes.bool,
  defaultBackground: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  preventScroll: PropTypes.bool,
  navigationLeftContent: PropTypes.any,
}

export default Screen

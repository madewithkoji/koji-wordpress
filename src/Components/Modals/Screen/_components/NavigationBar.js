import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Breakpoints from "../../_helpers/Breakpoints"

export const navbarHeight = "41px" //"53px" // make it smaller (similar to profiles)

const Bar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 999;
  position: relative;

  height: ${navbarHeight};
  max-height: ${navbarHeight};
  min-height: ${navbarHeight};

  @media ${Breakpoints.phone} {
    font-size: 16px;
  }

  backdrop-filter: blur(45px);
  background: ${({ theme }) => theme.colors["contextMenu.background"]};
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors["border.default"]};

  ${({ isSeamless, theme }) =>
    isSeamless &&
    `
    backdrop-filter: none;
    background: ${theme.colors["background.alt"]};
    border-bottom-color: ${theme.colors["background.alt"]};
  `}

  ${({ isFullHeight }) =>
    !isFullHeight &&
    `
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
  `}
`

const Name = styled.div`
  ${({ theme }) => theme.mixins.passThroughTouches}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mixins["font.extraBold"]}
  color: ${({ theme }) => theme.colors["foreground.default"]};
  font-size: 16px;
  line-height: 1;
`

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors["foreground.primary"]};
  display: flex;
  align-items: center;
  font-weight: normal;

  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0;
    margin-left: -4px;
  }

  &:hover {
    text-decoration: none;
  }

  border: unset;
  background: transparent;
`

const ActionButton = styled(Button)`
  left: unset;
  right: 0;
`

const NavigationBar = ({
  onClose,
  onCancel,
  onBack,
  name,
  actionItem,
  onAction,
  isSeamless,
  isFullHeight,
  leftContent,
}) => (
  <Bar isSeamless={isSeamless} isFullHeight={isFullHeight}>
    {onClose && (
      <Button onClick={() => onClose()}>{leftContent || "Close"}</Button>
    )}

    {onCancel && (
      <Button onClick={() => onCancel()}>{leftContent || "Cancel"}</Button>
    )}

    {onBack && (
      <Button onClick={() => onBack()}>{leftContent || "Back"}</Button>
    )}

    <Name>{name}</Name>

    {actionItem && (
      <ActionButton onClick={() => onAction()}>{actionItem}</ActionButton>
    )}
  </Bar>
)

NavigationBar.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onBack: PropTypes.func,
  actionItem: PropTypes.any,
  onAction: PropTypes.func,
  isSeamless: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  leftContent: PropTypes.any,
}

export default NavigationBar

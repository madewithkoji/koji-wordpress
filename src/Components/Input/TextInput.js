import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Container = styled.div`
  position: relative;
  width: 100%;

  ${(props) =>
    props.applyMarginBottom &&
    `
    margin-bottom: 30px;
  `}
`

const TextInput = styled.input`
  position: relative;
  outline: none;
  width: 100%;
  resize: none;
  border: 1px solid #999999;
  border-radius: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px !important;
  letter-spacing: -0.41px;
  color: #000000;
  padding: 12px !important;
  padding-top: 26px !important;
  padding-bottom: 8px !important;
  background: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  margin: 0; // safari fix

  &::placeholder {
    color: #999999;
  }

  ${(props) =>
    props.invalid === 1 &&
    `
      border-color: red;
  `}

  ${(props) =>
    props.isFocused &&
    `
    border-color: #007AFF !important;
  `}

  ${(props) =>
    props.isRounded &&
    `
    border-radius: 30px;
    padding-left: 20px;
    padding-right: 20px;
  `}

  ${(props) =>
    props.isWithoutPersistentLabel &&
    `
    padding-top: 17px !important;
    padding-bottom: 17px !important;
  `}

  ${(props) =>
    props.bothEndPadding &&
    `
    padding-left: ${props.bothEndPadding};
    padding-right: ${props.bothEndPadding};
  `}

  ${(props) =>
    props.isCentered &&
    `
    text-align: center;
  `}


  &::-webkit-autofill,
  &::-webkit-autofill:hover, 
  &::-webkit-autofill:focus, 
  &::-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`

const PersistentLabel = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  padding-left: 12px;
  padding-top: 10px;
  padding-bottom: 2px;
  width: calc(100% - 20px);
  border-radius: 10px 10px 0 0;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #757575;
  pointer-events: none;
  transition: all 0.2s ease;
  animation: fade-in 0.3s ease;

  ${(props) =>
    props.isInvalid &&
    `
    color: red;
  `}

  ${(props) =>
    props.isFocused &&
    `
    color: #007AFF;
  `}

  ${(props) =>
    props.isRounded &&
    `
    padding-left: 20px;
  `}

  ${(props) =>
    props.bothEndPadding &&
    `
    padding-left: ${props.bothEndPadding};
    padding-right: ${props.bothEndPadding};
  `}
`

export const CharacterCounter = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 13px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  color: #757575;
  opacity: 0;
  transition: all 0.15s ease;

  ${(props) =>
    props.isInvalid &&
    `
        color: red;
    `}

  ${(props) =>
    props.isVisible &&
    `
        opacity: 1;
    `}
`

export const InputError = styled.div`
  position: absolute;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #f44336;
  margin: 5px 7px 0px 13px;
  top: calc(100%);

  ${(props) =>
    props.isRounded &&
    `
    margin-left: 20px;
  `}
`

export const InputHelper = styled.div`
  position: absolute;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #4f4f4f;
  margin: 5px 7px 0px 7px;
  top: calc(100%);

  ${(props) =>
    props.isRounded &&
    `
    margin-left: 20px;
  `}
`

export const RightContentContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;

  > svg {
    color: #757575;
    cursor: pointer;
  }
`

export const LeftContentContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;

  > svg {
    color: #757575;
    cursor: pointer;
  }
`

const Component = (props) => {
  const [isFocused, setIsFocused] = useState(false)

  const {
    persistentLabel,
    value,
    onChange,
    placeholder,
    maxLength,
    errorLabel,
    helperLabel,
    type,
    pattern,
    isRounded,
    disabled,
    rightContent,
    leftContent,
    bothEndPadding,
    isCentered,
  } = props

  const isExceedingMaxLength = maxLength ? value.length > maxLength : false

  const isInvalid = errorLabel && errorLabel !== ""

  const isCharacterCounterVisible =
    maxLength && (isFocused || isExceedingMaxLength)

  return (
    <Container
      applyMarginBottom={isInvalid || isCharacterCounterVisible || helperLabel}
    >
      <TextInput
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        invalid={isExceedingMaxLength || isInvalid ? 1 : 0}
        isFocused={isFocused}
        isRounded={isRounded}
        disabled={disabled}
        pattern={pattern}
        bothEndPadding={bothEndPadding}
        isCentered={isCentered}
        isWithoutPersistentLabel={persistentLabel === false}
      />

      {persistentLabel && (
        <PersistentLabel
          isInvalid={isExceedingMaxLength || isInvalid}
          isRounded={isRounded}
          bothEndPadding={bothEndPadding}
          isFocused={isFocused}
        >
          {persistentLabel}
        </PersistentLabel>
      )}

      {maxLength && (
        <CharacterCounter
          isInvalid={isExceedingMaxLength}
          isVisible={isCharacterCounterVisible}
        >
          {`${value.length}/${maxLength}`}
        </CharacterCounter>
      )}

      {errorLabel !== "" && (
        <InputError isRounded={isRounded}>{errorLabel}</InputError>
      )}

      {helperLabel !== "" && !errorLabel && (
        <InputHelper isRounded={isRounded}>{helperLabel}</InputHelper>
      )}

      {leftContent && (
        <LeftContentContainer>{leftContent}</LeftContentContainer>
      )}

      {rightContent && (
        <RightContentContainer>{rightContent}</RightContentContainer>
      )}
    </Container>
  )
}

Component.propTypes = {
  persistentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  errorLabel: PropTypes.string,
  helperLabel: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  isRounded: PropTypes.bool,
  disabled: PropTypes.bool,
  rightContent: PropTypes.node,
  leftContent: PropTypes.node,
  bothEndPadding: PropTypes.string,
  isCentered: PropTypes.bool,
}

export default Component

import React, { useState } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const Component = ({
  value,
  onChange,
  placeholder,
  errorLabel,
  type,
  pattern,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const isInvalid = errorLabel && errorLabel !== ""

  return (
    <div
      className={classnames("koji-input__container", {
        "koji-input__container-applyMarginBottom": isInvalid,
      })}
    >
      <input
        className="koji-input__input"
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        invalid={isInvalid ? 1 : 0}
        isFocused={isFocused}
        disabled={disabled}
        pattern={pattern}
      />

      {errorLabel !== "" && (
        <div className="koji-input__error">{errorLabel}</div>
      )}
    </div>
  )
}

Component.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorLabel: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Component

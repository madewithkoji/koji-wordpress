import styled from "styled-components"

const Button = styled.button`
  align-items: center;
  background: #007aff;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  grid-area: pay;
  line-height: 16px;
  letter-spacing: -0.14px;
  justify-content: center;
  outline: none;
  padding: 20px 0;
  position: relative;
  user-select: none;
  text-align: center;
  transition: 0.2s ease transform, 0.2s ease background;
  width: 100%;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.95, 0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 30%;
  }

  ${(props) =>
    props.isRounded &&
    `
    border-radius: 30px;
  `}

  height: ${(props) => `${props.height}` || "unset"};
`

export const GrayButton = styled(Button)`
  color: #007aff;
  background: #f2f2f2;
`

export const WhiteButton = styled(Button)`
  color: #007aff;
  background: white;
  border: 1px solid #e5e5e5;
`

export const BlackButton = styled(Button)`
  color: white;
  background: #111111;
`

export const CustomButton = styled(Button)`
  background: ${(props) => `${props.backgroundColor}` || "#111111"};
  color: ${(props) => `${props.color}` || "white"};
`

export default Button

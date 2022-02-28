import styled from "styled-components"

// Koji Design Standards

export const Header4 = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Header3 = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0.4000000059604645px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Header2 = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  letter-spacing: 0.4px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Header5 = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Header6 = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Subtitle1 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.24px;
  color: ${({ color }) => color || "#111"};
`

export const Subtitle2 = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14000000059604645px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Subtitle3 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Body1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Body2 = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Body3 = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Caption = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => color || "#111"};
  margin-bottom: ${({ mb }) => mb || "0"};
`

export const Margin = styled.div`
  margin-bottom: ${({ mb }) => mb || "10px"};
`

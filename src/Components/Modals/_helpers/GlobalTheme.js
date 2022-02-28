import React from "react"
import PropTypes from "prop-types"

import { ThemeProvider, css } from "styled-components"

const DefaultTheme = {
  name: "aspergillus",
  colors: {
    "background.default": "#ffffff",
    "background.default#active": "#fafafa",
    "background.alt": "#f4f4f4",
    "background.alt#active": "#fafafa",
    "background.menu": "#ffffff",
    "background.contrast": "#111111",
    "background.highlight": "#f5f5f5",
    "background.success": "#2DCA8C",
    "background.footer": "#3e3e3e",

    "foreground.default": "#111111",
    "foreground.default#active": "#333333",
    "foreground.secondary": "#666666",
    "foreground.primary": "#007aff",
    "foreground.contrast": "#ffffff",
    "foreground.heading": "#a8a8a8",
    "foreground.destructive": "#F44336",
    "foreground.warning": "#f7e831",
    "foreground.success": "#308630",
    "foreground.link": "#007aff",

    // 'foreground.default': '#232326',
    // 'foreground.secondary': '#333333',

    "border.default": "#f4f4f4",
    "border.secondary": "rgba(0,0,0,0.08)",

    "boxShadow.default": "rgba(0,0,0,0.05)",
    "boxShadow.strong": "rgba(0,0,0,0.1)",

    "infoBox.background": "#e1f5fe",
    "infoBox.foreground": "#01579a",

    // 'splash.background': '#f7e831',
    // 'splash.background': '#fdcacf',
    // 'splash.background': '#fdcbd1',
    "splash.background": "#f4f4f4",
    "splash.highlight": "rgba(0,0,0,0.1)",

    "valuable.background": "#ffe811",
    "valuable.foreground": "#111111",

    "input.background": "#ffffff",
    "input.foreground": "#111111",
    "input.label": "#999999",

    "button.background": "#007aff",
    "button.foreground": "#ffffff",
    "button.foreground#disabled": "rgba(255, 255, 255, 0.3)",
    "button.background#hover": "rgba(21, 122, 251, 0.03)",
    "button.background#active": "#0067d6",

    "modal.background": "rgba(0,0,0,0.7)",
    "detailPane.background": "rgba(0,0,0,0.05)",

    "contextMenu.background": "rgba(255,255,255, 0.8)",
    "contextMenu.background#alt": "rgba(220,220,220,0.5)",
    "contextMenu.background#hover": "rgba(0,0,0,0.04)",
    "contextMenu.background#active": "rgba(0,0,0,0.06)",
    "contextMenu.border": "rgba(0,0,0,0.05)",
    "contextMenu.boxShadow": "rgba(0,0,0,0.1)",

    "editor.baseTheme": "vs",
    "editor.background": "#ffffff",
    "editor.livePreview.background": "#111111",
    "editor.livePreview.foreground": "#ffffff",
    "editor.openFilesList.background": "#fefefe",
    "editor.consoleOutput.background": "#000000",
    "editor.consoleOutput.foreground": "#ffffff",
    "editor.transparencyGridOverlay.background": "rgba(255,255,255,0.9)",

    "monaco.editor.background": "#ffffff",
  },
  mixins: {
    clickable: "cursor: pointer; user-select: none;",
    passThroughTouches: "pointer-events: none;",

    "font.defaultFamily":
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
    "font.defaultFamilyValue":
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    "font.monospaceFamily":
      'font-family: Menlo, Monaco, "Courier New", monospace;',
    "font.roundedFamily":
      'font-family: ui-rounded, "SF Pro Rounded", --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
    "font.bold": "font-weight: 500;",
    "font.extraBold": "font-weight: bold;",

    "card.default":
      "box-shadow: 0 6px 24px 0 rgba(0,0,0,0.05); background-color: #fff;",
    "card.alt":
      "box-shadow: 0 6px 24px 0 rgba(0,0,0,0.05); border-top: 4px solid black; background-color: #fff;",
    "card.active":
      "box-shadow: 0 6px 24px 0 rgba(0,0,0,0.05); border-top: 4px solid #157afb; background-color: #fff;",

    "chat.container":
      "box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.05); background-color: #fff;",

    "contextMenu.border": "",

    "editor.contentArea.container":
      "box-shadow: 2px 2px 12px 4px rgba(0,0,0,0.06);",
    "editor.visualControls.card":
      "box-shadow: 0 6px 24px 0 rgba(0,0,0,0.05); background-color: #fff;",

    "background.transparencyGrid": `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity="0.1" >
      <rect x="200" width="200" height="200" />
      <rect y="200" width="200" height="200" />
    </svg>`,

    hover: (str) => css`
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          ${str}
        }
      }
    `,

    horizontalScroll: css`
      &::-webkit-scrollbar {
        height: 8px !important;
        width: 8px !important;
      }
      padding-bottom: 18px;
      margin-bottom: -18px;

      @media (max-width: 767px) {
        &::-webkit-scrollbar {
          height: 0px !important;
          width: 0px !important;
        }
        margin-bottom: 0;
        padding-bottom: 0;
      }
    `,
    forcedHorizontalScroll: css`
      &::-webkit-scrollbar {
        height: 8px !important;
        width: 8px !important;
      }
      padding-bottom: 18px;
      margin-bottom: -18px;
    `,
    hideScrollbar: css`
      &::-webkit-scrollbar {
        height: 0px !important;
        width: 0px !important;
      }
    `,
    styledScrollbar: css`
      * {
        ::-webkit-scrollbar-button {
          background-color: #ffffff !important;
        }
        ::-webkit-scrollbar-track {
          background-color: #ffffff !important;
        }
        ::-webkit-scrollbar-track-piece {
          background-color: #ffffff !important;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #eaeaea !important;
        }
        ::-webkit-scrollbar-corner {
          background-color: #ffffff !important;
        }
        ::-webkit-resizer {
          background-color: #ffffff !important;
        }
      }
    `,
  },
  breakpoints: {
    phone: "(max-width: 767px)",
    tablet: "(max-width: 1024px)",
    default: "(min-width: 1025px)",
  },
}

const DarkTheme = {
  ...DefaultTheme,
  name: "aspergillus-dark",
  colors: {
    ...DefaultTheme.colors,
    "background.default": "#000000",
    "background.default#active": "#111111",
    "background.alt": "#1d1d1f",
    "background.alt#active": "#2d2d2f",
    "background.menu": "#000000",
    "background.contrast": "#2d2f30",
    "background.highlight": "#2d2f30",
    "background.success": "#2DCA8C",
    "background.footer": "#000000",

    "foreground.default": "#f5f5f7",
    "foreground.default#active": "#fafafa",
    "foreground.secondary": "#a1a1a6",
    "foreground.primary": "#007aff",
    "foreground.contrast": "#999999",
    "foreground.heading": "#999999",
    "foreground.destructive": "#F44336",
    "foreground.warning": "#f7e831",
    "foreground.success": "#4bc54b",
    "foreground.valuable": "",
    "foreground.link": "#007aff",

    "border.default": "#444444",
    "border.secondary": "rgba(255,255,255,0.08);",

    "boxShadow.default": "rgba(255,255,255,0.2)",
    "boxShadow.strong": "rgba(255,255,255,0.1)",

    "infoBox.background": "#2d2f30",
    "infoBox.foreground": "#999999",

    "splash.background": "#2d2f30",
    "splash.highlight": "rgba(0,0,0,0.1)",

    "valuable.background": "#dba622",
    "valuable.foreground": "#000000",

    "input.background": "rgba(255,255,255,0.1)",
    "input.foreground": "#999999",
    "input.label": "#999999",

    "button.background": "#007aff",
    "button.foreground": "#ffffff",
    "button.foreground#disabled": "rgba(255, 255, 255, 0.3)",
    "button.background#hover": "rgba(21, 122, 251, 0.03)",
    "button.background#active": "#0067d6",

    "modal.background": "rgba(0,0,0,0.8)",
    "detailPane.background": "rgba(0,0,0,0.05)",

    "contextMenu.background": "rgba(40,40,40,0.8)",
    "contextMenu.background#alt": "rgba(40,40,40,0.5)",
    "contextMenu.background#hover": "rgba(255,255,255,0.04)",
    "contextMenu.background#active": "rgba(255,255,255,0.06)",
    "contextMenu.border": "#444444",
    "contextMenu.boxShadow": "transparent",

    "editor.baseTheme": "vs-dark",
    "editor.background": "#000000",
    "editor.livePreview.background": "#111111",
    "editor.livePreview.foreground": "#999999",
    "editor.openFilesList.background": "#000000",
    "editor.consoleOutput.background": "#000000",
    "editor.consoleOutput.foreground": "#999999",
    "editor.transparencyGridOverlay.background": "rgba(0,0,0,0.9)",

    "monaco.editor.background": "#000000",
  },
  mixins: {
    ...DefaultTheme.mixins,
    "font.defaultFamily":
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
    "font.monospaceFamily":
      'font-family: Menlo, Monaco, "Courier New", monospace;',
    "font.bold": "font-weight: 500;",
    "font.extraBold": "font-weight: bold;",

    "card.default":
      "border: 1px solid rgba(255,255,255,0.05); background-color: #000000;",
    "card.alt":
      "border: 1px solid rgba(255,255,255,0.05); border-top: 4px solid #888888; background-color: #2d2f30;",
    "card.active":
      "border: 1px solid rgba(255,255,255,0.05); border-top: 4px solid #157afb; background-color: #2d2f30;",

    "chat.container":
      "border: 1px solid rgba(255,255,255,0.05); background-color: #2d2f30;",

    "contextMenu.border": "border: 1px solid #444444;",

    // 'editor.contentArea.container': 'border-left: 1px solid #34342e;',
    // 'editor.visualControls.card': 'border: 1px solid rgba(255,255,255,0.05); background-color: #111111;',

    "editor.contentArea.container":
      "box-shadow: 2px 2px 12px 4px rgba(255,255,255,0.05);",
    "editor.visualControls.card":
      "box-shadow: 0 6px 24px 0 rgba(255,255,255,0.05); background-color: #111111;",

    "background.transparencyGrid": `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity="0.9" >
      <rect x="200" width="200" height="200" />
      <rect y="200" width="200" height="200" />
    </svg>`,

    styledScrollbar: css`
      * {
        ::-webkit-scrollbar-button {
          background-color: #000000 !important;
        }
        ::-webkit-scrollbar-track {
          background-color: #000000 !important;
        }
        ::-webkit-scrollbar-track-piece {
          background-color: #000000 !important;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #2d2f30 !important;
        }
        ::-webkit-scrollbar-corner {
          background-color: #000000 !important;
        }
        ::-webkit-resizer {
          background-color: #000000 !important;
        }
      }
    `,
  },
}

// Global theme provider
const GlobalTheme = ({ children }) => {
  let prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  prefersDark = false

  if (prefersDark) {
    document.body.className = "dark"
  }

  return (
    <ThemeProvider theme={prefersDark ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}

GlobalTheme.propTypes = {
  children: PropTypes.node,
}

export default GlobalTheme

// Theme override
export const ThemeOverride = ({ theme, children }) => {
  const forceDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDark = theme === "aspergillus-dark" || forceDark
  return (
    <ThemeProvider theme={isDark ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}

ThemeOverride.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
}

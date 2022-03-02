import TextInput from "../Components/Input/TextInput"
import KojiLogoSvg from "../Icon/KojiBlackLogoSvg"
import { useState } from "react"
import {
  useBlockProps,
  RichText,
  BlockAlignmentToolbar,
  BlockControls,
  ColorPalette,
} from "@wordpress/block-editor"
import { Toolbar, Button as WordpressButton } from "@wordpress/components"
import AppStoreIframe from "./AppStoreIframe"
import { isURLValid, getKojiApp } from "../Utils/validation"
import classnames from "classnames"
const { __ } = wp.i18n

import Screen from "../Components/Modals/Screen"

const STEP_SPECIFY_LINK = "link"
const STEP_CUSTOMIZE_BUTTON = "button"

const Edit = (props) => {
  const { className, setAttributes, attributes } = props

  const [link, setLink] = useState(attributes.link)
  const [linkError, setLinkError] = useState("")

  const step =
    attributes.link === "" ? STEP_SPECIFY_LINK : STEP_CUSTOMIZE_BUTTON

  const [showChooseApp, setShowChooseApp] = useState(false)

  const buttonProps = useBlockProps()

  if (step === STEP_CUSTOMIZE_BUTTON) {
    return (
      <div {...buttonProps} className={className}>
        {
          <BlockControls>
            <BlockAlignmentToolbar
              value={attributes.alignment}
              controls={["center", "left", "right", "full"]}
              onChange={(newAlignment) => {
                setAttributes({
                  alignment: newAlignment === undefined ? "none" : newAlignment,
                })
              }}
            />

            <ColorPalette
              className={"koji-embed-button-color-palette"}
              colors={[]}
              value={attributes.color}
              clearable={false}
              onChange={(color) =>
                setAttributes({
                  color: color === undefined ? "#111" : color,
                })
              }
            />

            <Toolbar>
              <WordpressButton
                label="Edit URL"
                icon="edit"
                onClick={() => setAttributes({ link: "" })}
              />
            </Toolbar>
          </BlockControls>
        }

        <RichText
          tagName="div"
          className={classnames(
            "koji-embed-button",
            `koji-embed-button-${attributes.alignment}`
          )}
          style={{ background: attributes.color }}
          value={attributes.button}
          onChange={(content) => setAttributes({ button: content })}
          allowedBlockTypes={true}
          allowedFormats={
            [
              //'koji/koji-edit-url'
            ]
          }
        />
      </div>
    )
  }

  // SPECIFY LINK STEP
  return (
    <div className={classnames(className, "koji-editor__container")}>
      <div className={"koji-editor__header"}>
        <KojiLogoSvg />
        <div className="koji-typography__header4">{__("Add a Koji app")}</div>
      </div>

      <div style={{ marginBottom: "20px" }} />

      <button
        className="koji-button koji-black-button"
        onClick={() => setShowChooseApp(true)}
      >
        {__("Get from App Store")}
      </button>

      <div style={{ marginBottom: "10px" }} />

      <div className="koji-editor__horizontal-line">
        <span className="koji-typography__header6 koji-editor__horizontal-line-label">
          {__("OR")}
        </span>
      </div>

      <div style={{ marginBottom: "20px" }} />

      <div className={"koji-typography__body2"} style={{ marginBottom: "5px" }}>
        {__("Add a link to a Koji app")}
      </div>

      <TextInput
        isRounded
        value={link}
        onChange={(e) => {
          setLink(e.target.value)
          setLinkError("")
        }}
        persistentLabel={false}
        placeholder={"https://withkoji.com/@username/xxxx"}
        errorLabel={linkError}
      />

      <div style={{ marginBottom: "20px" }} />

      <button
        className="koji-button"
        onClick={() => {
          if (isURLValid(link) === false) {
            return setLinkError(__("URL Invalid"))
          }

          if (getKojiApp(link) === false) {
            return setLinkError(__("Koji URL invalid"))
          }

          setAttributes({ link: link })
        }}
      >
        Continue
      </button>

      {showChooseApp && (
        <Screen
          key="AppStore"
          title="App Store"
          onCancel={() => setShowChooseApp(false)}
          onDidAppear={() => null}
          onSetModalIsPresent={() => null}
          dismissOnBackgroundClick
          transition={"wordpress-plugin-custom"}
          preventScroll
          hideNavigationBar
        >
          <AppStoreIframe
            setLink={setLink}
            onCancel={() => setShowChooseApp(false)}
            onAppCreated={(url) => {
              setShowChooseApp(false)
              setLink(url)
              setAttributes({ link: url })
            }}
          />
        </Screen>
      )}
    </div>
  )
}

export default Edit

import styled from "styled-components"
import { Header4, Body2, Margin, Header6 } from "../Components/Typography"
import Button, { BlackButton } from "../Components/Button"
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

const Container = styled.div`
  padding: 10px 16px;
  border: 1px solid black;
  border-radius: 2px;
`

const Header = styled.div`
  display: flex;
  align-items: center;

  > svg {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
`

const HorizontalLine = styled.div`
  width: 100%;
  height: 15px;
  border-bottom: 1px solid #bebebe;
  text-align: center;
`

const HorizontalLineLabel = styled(Header6)`
  background-color: white;
  padding: 0 10px;
`

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
    <Container className={className}>
      <Header>
        <KojiLogoSvg />
        <Header4>{__("Add a Koji app")}</Header4>
      </Header>

      <Margin mb="20px" />

      <BlackButton onClick={() => setShowChooseApp(true)}>
        {__("Get from App Store")}
      </BlackButton>

      <Margin />

      <HorizontalLine>
        <HorizontalLineLabel as={"span"}>{__("OR")}</HorizontalLineLabel>
      </HorizontalLine>

      <Margin mb="20px" />

      <Body2 mb="5px">{__("Add a link to a Koji app")}</Body2>

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

      <Margin mb="20px" />

      <Button
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
      </Button>

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
    </Container>
  )
}

export default Edit

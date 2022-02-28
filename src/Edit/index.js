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
} from "@wordpress/block-editor"
import { Toolbar, Button as WordpressButton } from "@wordpress/components"
import AppStoreIframe from "./AppStoreIframe"
import { isURLValid, getKojiApp } from "../Utils/validation"
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
              onChange={(newAlignment) => {
                setAttributes({
                  alignment: newAlignment === undefined ? "none" : newAlignment,
                })
              }}
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
          className="koji-embed-button"
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
        <HorizontalLineLabel as={"span"}>OR</HorizontalLineLabel>
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
            return setLinkError("URL invalid")
          }

          if (getKojiApp(link) === false) {
            return setLinkError("Koji URL invalid")
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
              setAttributes({ link: url })
            }}
          />
        </Screen>
      )}
    </Container>
  )
}

export default Edit

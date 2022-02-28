import { registerBlockType } from "@wordpress/blocks"
//import { registerFormatType } from "@wordpress/rich-text"
import KojiLogoSvg from "./Icon/KojiBlackLogoSvg"
import Save from "./Save"
import Edit from "./Edit"
//import KojiEditLink from "./Formatters/KojiEditLink"
import "./style.css"

registerBlockType("koji/koji-embed-button", {
  title: "Koji App", // The title of block in editor.
  description: "Easily embed Koji apps",
  icon: <KojiLogoSvg />, // The icon of block in editor.
  category: "embed", // The category of block in editor.
  keywords: ["koji"],
  attributes: {
    link: {
      type: "string",
      default: "",
    },
    button: {
      type: "string",
      default: "My Koji App",
    },
    alignment: {
      type: "string",
      default: "center",
    },
    color: {
      type: "string",
      default: "#111",
    },
  },
  edit: Edit,
  save: Save,
})

/*registerFormatType("koji/koji-edit-url", {
  title: "Sample output",
  tagName: "samp",
  className: null,
  edit: KojiEditLink,
})*/

import { registerBlockType } from "@wordpress/blocks"
import KojiLogoSvg from "./Icon/KojiBlackLogoSvg"
import Save from "./Save"
import Edit from "./Edit"
import "./style.css"

registerBlockType("koji/koji-embed-button", {
  title: "Koji Button", // The title of block in editor.
  description: "Button that opens Koji apps",
  icon: <KojiLogoSvg />, // The icon of block in editor.
  category: "widgets", // The category of block in editor.
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
  },
  edit: Edit,
  save: Save,
})

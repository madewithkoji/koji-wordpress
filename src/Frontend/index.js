import React from "react"
import ReactDOM from "react-dom"
import KojiAppModal from "./KojiAppModal"
import { isURLValid, getKojiApp } from "../Utils/validation"

const loadKojiApp = (url) => {
  const container = document.createElement("div")

  ReactDOM.render(
    <KojiAppModal url={url} onClose={() => container.remove()} />,
    document.body.appendChild(container)
  )
}

const loadKojiButtons = () => {
  const buttons = document.querySelectorAll(".koji-embed-button")

  buttons.forEach((item) => {
    item.addEventListener("click", () => {
      loadKojiApp(item.dataset.koji)
    })
  })
}

const loadKojiLinks = () => {
  const links = document.querySelectorAll("a")

  links.forEach((item) => {
    const href = item.getAttribute("href")

    if (isURLValid(href) === false) {
      return // skip
    }

    if (getKojiApp(href) === false) {
      return // skip not Koji App link
    }

    item.addEventListener("click", (e) => {
      e.preventDefault()
      loadKojiApp(href)
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  loadKojiButtons()
  loadKojiLinks()
})

import React from "react"
import ReactDOM from "react-dom"
import KojiAppModal from "./KojiAppModal"

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".koji-embed-button")

  const loadKojiApp = (url) => {
    const container = document.createElement("div")

    ReactDOM.render(
      <KojiAppModal url={url} onClose={() => container.remove()} />,
      document.body.appendChild(container)
    )
  }

  buttons.forEach((item) => {
    item.addEventListener("click", () => {
      loadKojiApp(item.dataset.koji)
    })
  })
})

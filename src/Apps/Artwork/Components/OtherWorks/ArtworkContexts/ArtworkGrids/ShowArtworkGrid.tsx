import React from "react"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const ShowArtworkGrid = () => {
  return (
    <>
      <Header
        title={`Other works from show`}
        buttonHref={sd.APP_URL + "/www.FIXME"}
      />
    </>
  )
}

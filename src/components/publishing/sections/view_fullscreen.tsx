import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

const ViewFullscreenLink = styled.div`
  ${Fonts.unica("s14", "medium")}
  margin: 0;
  margin-left: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
  display: inline-block;
  min-width: 7.1em;
  white-space: nowrap;
  align-self: flex-start;
`

function ViewFullscreen() {
  return <ViewFullscreenLink>View Fullscreen</ViewFullscreenLink>
}

export default ViewFullscreen

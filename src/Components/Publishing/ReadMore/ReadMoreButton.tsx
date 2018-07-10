import { unica } from "Assets/Fonts"
import { once } from "lodash"
import React from "react"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { StandardLayoutParent } from "../Layouts/StandardLayout"

export class ReadMore extends React.Component<any, any> {
  onClick = () => {
    this.props.onClick(...arguments)
  }

  trackImpression = () => {
    const { tracking } = this.props

    tracking.trackEvent({
      action: "Impression",
      impression_type: "Read more button",
    })
  }

  render() {
    return (
      <StandardLayoutParent>
        <ReadMoreContainer>
          <ReadMoreButton onClick={this.onClick}>Read More</ReadMoreButton>
        </ReadMoreContainer>
        <Waypoint onEnter={once(this.trackImpression)} />
      </StandardLayoutParent>
    )
  }
}

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 270px;
  height: 40px;
  background-color: black;
  border: 1px solid black;
  border-radius: 2px;
  ${unica("s14", "medium")};
  padding-top: 1px;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
  ${pMedia.md`
    width: 100%;
  `};
`
const ReadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  max-width: 1150px;
  margin: auto;
  margin-bottom: 80px;
  ${pMedia.xl`
    padding: 20px;
    padding-left: 0px;
  `} ${pMedia.sm`
    padding: 20px;
  `};
`

export default track()(ReadMore)

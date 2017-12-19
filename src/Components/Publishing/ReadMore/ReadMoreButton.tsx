import React from "react"
import styled from "styled-components"
import { track } from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"
import { StandardLayoutParent } from "../Layouts/StandardLayout"

@track()
export class ReadMore extends React.Component<any, any> {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  @track({ action: "Clicked read more" })
  onClick() {
    this.props.onClick(...arguments)
  }

  render() {
    return (
      <StandardLayoutParent>
        <ReadMoreContainer onClick={this.onClick}>
          <ReadMoreButton>Read More</ReadMoreButton>
        </ReadMoreContainer>
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
  ${Fonts.unica("s14", "medium")}
  padding-top: 1px;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
  ${pMedia.md`
    width: 100%;
  `}
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
  `}
  ${pMedia.sm`
    padding: 20px;
  `}
`

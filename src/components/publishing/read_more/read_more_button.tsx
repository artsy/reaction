import React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

const ReadMore: React.SFC<any> = props => {
  return (
    <ReadMoreContainer onClick={props.onClick}>
      <ReadMoreButton>
        Read More
      </ReadMoreButton>
    </ReadMoreContainer>
  )
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
  ${pMedia.md`
    width: 100%;
  `}
  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
`
const ReadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  max-width: 1150px;
  margin: auto;
  ${pMedia.lg`
    padding: 20px;
  `}
`
export default ReadMore

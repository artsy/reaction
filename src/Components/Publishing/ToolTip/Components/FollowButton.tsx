import styled from "styled-components"
import React from "react"
import { unica } from "Assets/Fonts"
import Colors from "Assets/Colors"

export const FollowButton: React.SFC = () => {
  return <FollowButtonContainer>Follow</FollowButtonContainer>
}

const FollowButtonContainer = styled.div`
  border: 1px solid ${Colors.grayRegular};
  ${unica("s12", "medium")};
  width: 80px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: black;
    background: black;
    color: white;
  }
`

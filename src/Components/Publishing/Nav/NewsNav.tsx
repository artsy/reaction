import moment from "moment"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface Props {
  date: string
}

export const NewsNav: React.SFC<Props> = props => {
  const { date } = props

  return (
    <NewsNavContainer>
      <MaxWidthContainer>
        <Date>{moment(date).format("MMM MM")}</Date>
        <Title>The News</Title>
      </MaxWidthContainer>
    </NewsNavContainer>
  )
}

const NavText = styled.div`
  ${Fonts.unica("s25", "medium")};
  padding: 10px 0;

  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`

const Date = NavText.extend`
  position: absolute;
  width: 100%;
  text-align: center;
`

const Title = NavText.extend`
  ${pMedia.sm`
    margin-left: 20px;
  `};
`

const MaxWidthContainer = styled.div`
  position: relative;
  max-width: 780px;
  margin: auto;
`

const NewsNavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 45px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  ${pMedia.sm`
    height: 36px;
  `};
`

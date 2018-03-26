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
  const today = new Date()
  const hasYear = moment(date).format("YYYY") !== moment(today).format("YYYY")
  const isToday =
    moment(date).format("MMM D, YYYY") === moment(today).format("MMM D, YYYY")
  const format = hasYear ? "MMM D, YYYY" : "MMM D"

  return (
    <NewsNavContainer>
      <MaxWidthContainer>
        <NavText>{isToday ? "Today" : moment(date).format(format)}</NavText>
        <Title>The News</Title>
      </MaxWidthContainer>
    </NewsNavContainer>
  )
}

const NavText = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`

const Title = NavText.extend`
  position: absolute;
  left: 30px;
  ${pMedia.sm`
    left: 20px;
  `};
`

const MaxWidthContainer = styled.div`
  position: relative;
  max-width: 780px;
  margin: auto;
  display: flex;
  justify-content: center;
`

const NewsNavContainer = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 0;
  background: white;
  z-index: 1;
`

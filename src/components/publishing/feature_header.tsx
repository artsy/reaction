import React from "react"
import styled from "styled-components"
import Fonts from "./fonts"

function renderFeatureImage(url, layout) {
  if (layout === "full") {
    return (
      <div>
        <FeatureImage src={url} />
        <Overlay />
      </div>
    )
  } else if (layout === "split") {
    return <FeatureImage src={url} />
  } else {
    return false
  }
}
function renderImage(url, layout) {
  if (layout === "text") {
    return <Image src={url} />
  } else {
    return false
  }
}

function FeatureHeader(props) {
  const { header } = props
  return (
    <FeatureHeaderContainer data-layout={header.layout}>
      {renderFeatureImage(header.url, header.layout)}
      <HeaderTextContainer>
        <HeaderText>
          <Vertical>{header.vertical}</Vertical>
          <Title>{header.title}</Title>
          <SubHeader>
            <SubHeaderText>{header.subheader}</SubHeaderText>
            <AuthorDate>
              <BulletText>{header.author}</BulletText>
              <BulletText>{header.date}</BulletText>
            </AuthorDate>
          </SubHeader>
        </HeaderText>
        {renderImage(header.url, header.layout)}
      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}
const Div = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
const Overlay = Div.extend`
  position: absolute;
  background-color: black;
  opacity: 0.17;
`
const Title = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 75px;
`
const Vertical = styled.div`
  ${Fonts.unica("s19", "medium")}
`
const HeaderTextContainer = Div.extend`
  margin: auto;
`
const HeaderText = Div.extend`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
  padding: 20px;
  color: #000;
  justify-content: flex-start;
`
const FeatureImage = Div.extend`
  position: absolute;
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  right: 0;
  width: 100%;
`
const Image = styled.img`
  width: 100%;
  height: auto;
  padding: 20px;
  box-sizing: border-box;
`
const SubHeader = styled.div`
  ${Fonts.unica("s19", "medium")}
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const BulletText = styled.div`
  margin-left: 30px;
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #000;
  }
`
const SubHeaderText = styled.div`
  max-width: 600px;
`
const AuthorDate = styled.div`
  display: flex;
`
const FeatureHeaderContainer = Div.extend`
  &[data-layout='text'] {
    ${Title} {
      margin-bottom: 150px;
    }
    ${HeaderText} {
      max-width: none;
    }
  }
  &[data-layout='split'] {
    ${Title} {
      flex-grow: 1;
    }
    ${HeaderText} {
      width: 50%;
    }
    ${FeatureImage} {
      width: 50%;
      border: 20px solid white;
    }
    ${SubHeader} {
      align-items: flex-start;
      flex-direction: column;
    }
    ${BulletText} {
      margin-left: 0px;
      margin-right: 30px;
    }
    ${SubHeaderText} {
      margin-bottom: 30px;
    }
  }
  &[data-layout='full']{
    ${HeaderText} {
      padding: 50px;
      color: #fff;
      justify-content: flex-end;
      margin: auto;
    }
    ${BulletText} {
      &:before {
        background-color: #fff;
      }
    }
  }
`

export default FeatureHeader

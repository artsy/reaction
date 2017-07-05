import React from "react"
import styled from "styled-components"
import Fonts from "./fonts"

function renderFeatureImage(url, layout) {
  if (layout === "full") {
    return (
      <div>
        <FeatureImage src={url} data-layout="full" />
        <Overlay />
      </div>
    )
  } else if (layout === "split") {
    return <FeatureImage src={url} data-layout="split" />
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
    <Div>
      {renderFeatureImage(header.url, header.layout)}
      <HeaderTextContainer data-layout={header.layout}>
        <HeaderText data-layout={header.layout}>
          <Vertical>{header.vertical}</Vertical>
          <Title data-layout={header.layout}>{header.title}</Title>
          <SubHeader data-layout={header.layout}>
            <SubHeaderText data-layout={header.layout}>{header.subheader}</SubHeaderText>
            <AuthorDate>
              <BulletText data-layout={header.layout}>{header.author}</BulletText>
              <BulletText data-layout={header.layout}>{header.date}</BulletText>
            </AuthorDate>
          </SubHeader>
        </HeaderText>
        {renderImage(header.url, header.layout)}
      </HeaderTextContainer>
    </Div>
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
  margin-bottom: ${props => (props["data-layout"] !== "text" ? "75px" : "150px")};
  flex-grow: ${props => (props["data-layout"] === "split" ? 1 : 0)};
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
  width: ${props => (props["data-layout"] !== "split" ? "100%" : "50%")};
  max-width: ${props => (props["data-layout"] === "text" ? "none" : "1250px")};
  padding: ${props => (props["data-layout"] !== "full" ? "20px" : "50px")};
  color: ${props => (props["data-layout"] === "full" ? "#fff" : "#000")};
  justify-content: ${props => (props["data-layout"] === "full" ? "flex-end" : "flex-start")};
  margin: ${props => (props["data-layout"] === "full" ? "auto" : "")};
`
const FeatureImage = Div.extend`
  width: ${props => (props["data-layout"] === "split" ? "50%" : "100%")};
  border: ${props => (props["data-layout"] === "split" ? "20px solid white" : "0px")};
  position: absolute;
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  right: 0;
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
  align-items: ${props => (props["data-layout"] === "split" ? "flex-start" : "center")};
  flex-direction: ${props => (props["data-layout"] === "split" ? "column" : "row")};
`
const BulletText = styled.div`
  margin-left: ${props => (props["data-layout"] === "split" ? "0px" : "30px")};
  margin-right: ${props => (props["data-layout"] === "split" ? "30px" : "0px")};
  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: ${props => (props["data-layout"] === "full" ? "#fff" : "#000")};
  }
`
const SubHeaderText = styled.div`
  max-width: 600px;
  margin-bottom: ${props => (props["data-layout"] === "split" ? "30px" : "0px")};
`
const AuthorDate = styled.div`
  display: flex;
`

export default FeatureHeader

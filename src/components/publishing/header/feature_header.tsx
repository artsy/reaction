import React from "react"
import styled from "styled-components"
import Fonts from "../fonts"
import AuthorDate from "./author_date"

function renderFeatureImage(url, layout) {
  if (layout === "fullscreen") {
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

interface FeatureHeaderProps {
  article?: any
}

const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article } = props
  const hero = article.hero_section
  return (
    <FeatureHeaderContainer data-type={hero.type}>
      {renderFeatureImage(hero.url, hero.type)}
      <HeaderTextContainer>
        <HeaderText>
          <Vertical>{article.vertical.name}</Vertical>
          <Title>{article.title}</Title>
          <SubHeader>
            <SubHeaderText>{hero.subheader}</SubHeaderText>
            <AuthorDate layout={hero.type} authors={article.contributing_authors} date={article.published_at} />
          </SubHeader>
        </HeaderText>
        {renderImage(hero.url, hero.type)}
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

const SubHeaderText = styled.div`
  max-width: 600px;
`

const FeatureHeaderContainer = Div.extend`
  &[data-type='text'] {
    ${Title} {
      margin-bottom: 150px;
    }
    ${HeaderText} {
      max-width: none;
    }
  }
  &[data-type='split'] {
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
    ${SubHeaderText} {
      margin-bottom: 30px;
    }
  }
  &[data-type='fullscreen']{
    ${HeaderText} {
      padding: 50px;
      color: #fff;
      justify-content: flex-end;
      margin: auto;
    }
  }
`

export default FeatureHeader

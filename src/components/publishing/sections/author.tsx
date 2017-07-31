import * as React from "react"
import Markdown from "react-markdown"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import Icon from "../../icon"
import Fonts from "../fonts"

interface AuthorProps {
  author: any
}

const Author: React.SFC<AuthorProps> = props => {
  const { author } = props
  return (
    <AuthorContainer>
      <ProfileImage src={author.image_url} />
      <AuthorInfo>
        <Markdown source={author.bio} disallowedTypes={["Paragraph"]} unwrapDisallowed containerTagName="span" />
        <Twitter>
          <TwitterHandle href={`http://twitter.com/${author.twitter_handle}`}>
            <Icon name="twitter" color="black" />
            {`@${author.twitter_handle}`}
          </TwitterHandle>
        </Twitter>
      </AuthorInfo>
    </AuthorContainer>
  )
}

interface ProfileImageProps extends React.HTMLProps<HTMLDivElement> {
  image_url?: string
}

const Div: StyledFunction<ProfileImageProps> = styled.div

const ProfileImage = Div`
  min-width: 70px;
  min-height: 70px;
  border-radius: 50%;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
  ${pMedia.sm`
    min-width: 40px;
    min-height: 40px;
  `}
`
const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const AuthorInfo = styled.div`
  display: block;
  margin-left: 10px;
  ${Fonts.garamond("s23")}
  ${pMedia.sm`
    ${Fonts.garamond("s17")}
  `}
  a {
    color: black;
  }
`
const Twitter = styled.span`
  margin-left: 20px;
`
const TwitterHandle = styled.a`
  ${Fonts.unica("s14", "medium")}
  color: black;
  text-decoration: none;
  ${Icon} {
    vertical-align: middle;
    margin: 0px;
  }
  ${pMedia.sm`
    ${Fonts.unica("s12", "medium")}
  `}
`
export default Author

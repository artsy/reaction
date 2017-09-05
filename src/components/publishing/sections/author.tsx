import * as React from "react"
import Markdown from "react-markdown"
import styled, { StyledFunction } from "styled-components"
import { resize } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import Icon from "../../icon"
import Fonts from "../fonts"

interface AuthorProps {
  author: any
}

const Author: React.SFC<AuthorProps> = props => {
  const { author } = props
  const profileImage = author.image_url ? <ProfileImage src={resize(author.image_url, { width: 200 })} /> : false
  return (
    <AuthorContainer>
      {profileImage}
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
  margin-right: 10px;
  ${pMedia.xs`
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
  ${Fonts.garamond("s23")}
  ${pMedia.xs`
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
  white-space: nowrap;
  ${Icon} {
    vertical-align: middle;
    margin: 0px;
  }
  ${pMedia.xs`
    ${Fonts.unica("s12", "medium")}
  `}
`
export default Author

import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import Icon from "../icon"
import Fonts from "./fonts"

interface AuthorProps {
  author: any
}

const Author: React.SFC<AuthorProps> = props => {
  const { author } = props
  return (
    <AuthorContainer>
      <ProfileImage src={author.image_url} />
      <AuthorInfo>
        <Bio>{author.bio}</Bio>
        <TwitterHandle href={`http://twitter.com/${author.twitter_handle}`}>
          <Icon name="twitter" color="black" />
          {`@${author.twitter_handle}`}
        </TwitterHandle>
      </AuthorInfo>
    </AuthorContainer>
  )
}

interface ProfileImageProps extends React.HTMLProps<HTMLDivElement> {
  image_url?: string
}

const Div: StyledFunction<ProfileImageProps> = styled.div

const ProfileImage = Div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
`
const AuthorContainer = styled.div`
  display: flex;
`
const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`
const Bio = styled.div`
  ${Fonts.garamond("s17")}
  margin-bottom: 10px;
`
const TwitterHandle = styled.a`
  ${Fonts.unica("s14", "medium")}
  color: black;
  text-decoration: none;
  ${Icon} {
    vertical-align: middle;
    margin: 0px;
  }
`
export default Author

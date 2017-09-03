import React from "react"
import styled from "styled-components"
import Icon from "../icon"

interface ShareProps extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
}

const Share: React.SFC<ShareProps> = props => {
  const { url, title } = props
  const encodedUrl = encodeURIComponent(url)
  const getHref = type => {
    const channels = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?original_referer=${encodedUrl}&text=${title}&url=${encodedUrl}&via=artsy`,
      email: `mailto:?subject=${title}&body=Check out ${title} on Artsy: ${url}`,
    }
    return channels[type]
  }
  return (
    <ShareContainer>
      <IconWrapper href={getHref("facebook")} target="_blank">
        <Icon name="facebook" color="white" fontSize="30px" />
      </IconWrapper>
      <IconWrapper href={getHref("twitter")} target="_blank">
        <Icon name="twitter" color="white" fontSize="30px" />
      </IconWrapper>
      <IconWrapper href={getHref("email")}><Icon name="mail" color="white" fontSize="30px" /></IconWrapper>
    </ShareContainer>
  )
}
const ShareContainer = styled.div`
  display: flex;
  max-width: 350px;
  margin-bottom: 40px;
`

const IconWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 40px;
  width: 113px;
  text-decoration: none;
  background-color: black;
  color: white;
  border-radius: 2px;
  border: 1px solid black;
  margin-right: 10px;
  &:hover {
    background-color: white;
    ${Icon} {
      color: black;
    }
  }
`
export default Share

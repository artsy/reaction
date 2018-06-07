import styled from "styled-components"

interface AvatarProps {
  size: string
}

export const Avatar = styled.img.attrs<AvatarProps>({})`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
`

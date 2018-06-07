// @ts-ignore
import React from "react"
import styled from "styled-components"

export interface AvatarProps {
  size: string
}

export const Avatar = styled.img.attrs<AvatarProps>({})`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
`

import React from "react"
import styled, { StyledFunction } from "styled-components"
import Icon from "../Icon"
import * as fonts from "../../Assets/Fonts"

interface Props {
  fontSize: number
}

// TODO: extract this abstraction over typed styled components
// to a sensible location, an use that to replace other occurrences
// of "StyledFunction<Props & React…"
type Styled<P, T> = StyledFunction<P & React.HTMLProps<T>>
type StyledDiv<P> = Styled<P, HTMLDivElement>

const div: StyledDiv<Props> = styled.div

const Wrapper = div`
 ${fonts.primary.style}
  font-size: ${p => p.fontSize}px;
`

const Text = styled.span`
  padding-left: 0.15em;
`

export const BackButton = ({ children, fontSize = 11 }) => (
  <Wrapper fontSize={fontSize}>
    <Icon name="chevron-left" color="black" fontSize={`${0.8 * fontSize}px`} />
    <Text>{children}</Text>
  </Wrapper>
)

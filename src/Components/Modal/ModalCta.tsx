import { color } from "@artsy/palette"
import InvertedButton from "Components/Buttons/Inverted"
import React, { SFC } from "react"
import styled from "styled-components"
import { media } from "../Helpers"

export interface CtaProps {
  isFixed: boolean
  text: string
  onClick: () => void
}

export const ModalCta: SFC<{
  cta?: CtaProps
  hasImage?: boolean
  onClose: () => void
}> = props => {
  const {
    cta: { isFixed, onClick, text },
    hasImage,
    onClose,
  } = props

  return (
    <Cta isFixed={isFixed} hasImage={hasImage}>
      <InvertedButton onClick={onClick || onClose}>{text}</InvertedButton>
    </Cta>
  )
}

const Cta = styled.div.attrs<{ isFixed?: boolean; hasImage?: boolean }>({})`
  padding: 20px 0 30px 0;
  button {
    margin: 0;
    width: 100%;
  }
  ${props =>
    props.isFixed &&
    `
    position: absolute;
    bottom: 0;
    right: 40px;
    left: ${props.hasImage ? "calc(50% + 40px)" : "40px"};
    background: white;
    border-top: 1px solid ${color("black10")};
  `};

  ${media.sm`
    padding-bottom: 20px;
    ${props =>
      props.isFixed &&
      `
      right: 20px;
      left: 20px
    `}
  `};
`

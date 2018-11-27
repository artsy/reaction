import { color } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"

import { ModalWidth, ModalWrapper } from "Components/Modal/ModalWrapper"
import { media } from "../Helpers"
import { CtaProps, ModalCta } from "./ModalCta"
import { ModalHeader } from "./ModalHeader"

export interface ModalProps extends React.HTMLProps<Modal> {
  blurContainerSelector?: string
  cta?: CtaProps
  onClose?: () => void
  hasLogo?: boolean
  isWide?: boolean
  image?: string
  show?: boolean
  title?: string
}

export class Modal extends React.Component<ModalProps> {
  static defaultProps = {
    show: false,
    blurContainerSelector: "",
  }

  state = {
    isAnimating: this.props.show || false,
    isShown: this.props.show || false,
    blurContainers: this.props.blurContainerSelector
      ? Array.from(document.querySelectorAll(this.props.blurContainerSelector))
      : [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        isAnimating: true,
        isShown: nextProps.show,
      })
    }
  }

  close = () => {
    this.props.onClose()
  }

  render(): JSX.Element {
    const {
      children,
      cta,
      hasLogo,
      image,
      isWide,
      onClose,
      show,
      title,
    } = this.props

    return (
      <ModalWrapper
        cta={cta}
        onClose={onClose}
        show={show}
        width={isWide ? ModalWidth.Wide : ModalWidth.Normal}
        image={image}
        fullscreenResponsiveModal
      >
        <CloseButton name="close" onClick={this.close} />

        {image && <Image image={image} />}

        <ModalContent cta={cta} hasImage={image && true}>
          {(hasLogo || title) && (
            <ModalHeader title={title} hasLogo={hasLogo} />
          )}

          <div>{children}</div>

          {cta && (
            <ModalCta cta={cta} hasImage={image && true} onClose={this.close} />
          )}
        </ModalContent>
      </ModalWrapper>
    )
  }
}

export const ModalContent = styled.div.attrs<{
  cta: CtaProps
  hasImage: boolean
}>({})`
  padding: ${props =>
    props.cta
      ? props.cta.isFixed
        ? "20px 40px 100px"
        : "20px 40px 0"
      : "20px 40px 40px"};
  width: 100%;

  width: ${props => (props.cta && props.hasImage ? "50%" : "100%")};
  margin-left: ${props => props.cta && props.hasImage && "50%"};
  ${media.sm`
    padding: ${props =>
      props.cta && props.cta.isFixed ? "20px 20px 110px" : "20px"};
  `};
`

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(200, 200, 200, 0.5);
`

export const CloseButton = styled(Icon).attrs({
  color: color("black60"),
  fontSize: "16px",
})`
  position: absolute;
  top: 15px;
  right: 12px;
  cursor: pointer;
`

const Image = styled.div.attrs<{ image: string }>({})`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 50%;
  ${media.sm`
    display: none;
  `};
`

export default Modal

import { color } from "@artsy/palette"
import Icon from "Components/Icon"
import React from "react"
import styled, { injectGlobal, keyframes } from "styled-components"
import FadeTransition from "../Animation/FadeTransition"
import { media } from "../Helpers"
import { CtaProps, ModalCta } from "./ModalCta"
import { ModalHeader } from "./ModalHeader"

export interface ModalProps extends React.HTMLProps<Modal> {
  blurContainerSelector?: string
  cta?: CtaProps
  onClose?: () => void
  hasLogo?: boolean
  image?: string
  isWide?: boolean
  show?: boolean
  title?: string
}

export interface ModalState {
  isAnimating: boolean
  isShown: boolean
  blurContainers: Element[]
}

injectGlobal`
  .blurred {
    filter: blur(50px);
  }
`

export class Modal extends React.Component<ModalProps, ModalState> {
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

  componentWillUnmount() {
    this.removeBlurToContainers()
  }

  close = () => {
    this.props.onClose()
    this.removeBlurToContainers()
  }

  addBlurToContainers = () => {
    for (const container of this.state.blurContainers) {
      container.classList.add("blurred")
    }
  }

  removeBlurToContainers = () => {
    for (const container of this.state.blurContainers) {
      container.classList.remove("blurred")
    }
  }

  render(): JSX.Element {
    const { children, cta, hasLogo, image, isWide, title } = this.props
    const { isShown, isAnimating } = this.state

    if (isShown) {
      this.addBlurToContainers()
    } else {
      this.removeBlurToContainers()
    }

    return (
      <ModalWrapper isShown={isShown || isAnimating}>
        {isShown && <ModalOverlay onClick={this.close} />}
        <FadeTransition
          in={isShown}
          mountOnEnter
          onExited={() => {
            this.setState({ isAnimating: false })
          }}
          unmountOnExit
          timeout={{ enter: 10, exit: 200 }}
        >
          <ModalContainer isWide={isWide} image={image}>
            <ModalInner>
              <CloseButton name="close" onClick={this.close} />

              {image && <Image image={image} />}

              <ModalContent cta={cta}>
                {(hasLogo || title) && (
                  <ModalHeader title={title} hasLogo={hasLogo} />
                )}

                <div>{children}</div>

                {cta && (
                  <ModalCta
                    cta={cta}
                    hasImage={image && true}
                    onClose={this.close}
                  />
                )}
              </ModalContent>
            </ModalInner>
          </ModalContainer>
        </FadeTransition>
      </ModalWrapper>
    )
  }
}

const slideUp = keyframes`
  from {
    transform: translate(-50%,-40%);
    opacity: 0;
  },

  to {
    transform: translate(-50%,-50%);
    opacity: 1;
  }
`

const ModalWrapper = styled.div.attrs<{ isShown?: boolean }>({})`
  ${props =>
    props.isShown &&
    `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999
  `};
`

const ModalContent = styled.div.attrs<{ cta: CtaProps }>({})`
  padding: ${props =>
    props.cta
      ? props.cta.isFixed
        ? "20px 40px 100px"
        : "20px 40px 0"
      : "20px 40px 40px"};
  width: 100%;
  ${media.sm`
    padding: ${props =>
      props.cta && props.cta.isFixed ? "20px 20px 110px" : "20px"};
  `};
`

export const ModalContainer = styled.div.attrs<{
  isWide?: boolean
  image?: string
}>({})`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: ${props => (props.isWide || props.image ? "900px" : "440px")};
  height: min-content;
  border-radius: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 250ms linear;

  ${ModalContent} {
    ${props =>
      props.image &&
      `
      width: 50%;
      margin-left: 50%;
    `};
  }
  ${media.sm`
    width: 100%;
    border-radius: 0;
  `};
`

const ModalInner = styled.div`
  /* disabling scrolling until custom scrollbars are implemented */
  /* overflow-y: scroll; */
  max-height: calc(100vh - 80px);
  ${media.sm`
    max-height: 100vh;
    height: 100vh
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
  bottom: 0px;
  left: 0;
  right: 50%;
  ${media.sm`
    display: none;
  `};
`

export default Modal

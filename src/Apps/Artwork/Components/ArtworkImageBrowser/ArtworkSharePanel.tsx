import { Box, color, Flex, Sans, Separator, space } from "@artsy/palette"
import { ArtworkSharePanel_artwork } from "__generated__/ArtworkSharePanel_artwork.graphql"
import Icon from "Components/Icon"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ArtworkSharePanelProps {
  artwork: ArtworkSharePanel_artwork
  onClose: () => void
}

interface ArtworkSharePanelState {
  copyLabelText: string
  copyLocked: boolean
}

const MODAL = {
  width: 750,
  height: 400,
}

const COPY_LABELS = {
  copy: "Copy",
  copied: "Copied",
}

export class ArtworkSharePanel extends React.Component<
  ArtworkSharePanelProps,
  ArtworkSharePanelState
> {
  private input: HTMLInputElement

  state = {
    copyLabelText: COPY_LABELS.copy,
    copyLocked: false,
  }

  handleCopy = () => {
    if (!this.state.copyLocked) {
      this.input.focus()
      this.input.setSelectionRange(0, this.input.value.length)
      document.execCommand("copy")

      this.setState(
        {
          copyLabelText: COPY_LABELS.copied,
          copyLocked: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              copyLabelText: COPY_LABELS.copy,
              copyLocked: false,
            })
          }, 500)
        }
      )
    }
  }

  openShareModal = ({ service, href }) => event => {
    event.preventDefault()

    // Extracted from https://github.com/artsy/force/blob/master/src/desktop/components/share/view.coffee#L19
    const wLeft = window.screenLeft || window.screenX
    const wTop = window.screenTop || window.screenY
    const width = MODAL.width
    const height = MODAL.height
    const left = wLeft + window.innerWidth / 2 - width / 2 || 0
    const top = wTop + window.innerHeight / 2 - height / 2 || 0

    const options = Object.entries({
      status: 1,
      width,
      height,
      top,
      left,
    })
      .map(([key, value]) => `${key}=${value}`)
      .join(",")

    window.open(href, service, options)
  }

  renderShareButton({ service, label, message, href }) {
    return (
      <Flex
        flexDirection="row"
        flexBasis="50%"
        mt={2}
        onClick={this.openShareModal({
          service,
          href,
        })}
      >
        <Icon name={service} color="black" />
        <Sans size="3" color="black60">
          <a>{label}</a>
        </Sans>
      </Flex>
    )
  }

  render() {
    const {
      artwork: { href, imageDescription, images },
    } = this.props

    const shareImageUrl = images && images[0].url

    return (
      <Container>
        <Box position="absolute" top={space(1)} right={space(1)}>
          <CloseIcon name="close" onClick={this.props.onClose} />
        </Box>
        <Flex flexDirection="column" p={2}>
          <Flex flexDirection="row" mb={2}>
            <Sans size="3" weight="medium" color="black100">
              Share
            </Sans>
          </Flex>
          <Flex flexDirection="row" mb={1}>
            <SansGrow size="2" color="black60" mr={4}>
              <URLInput
                type="text"
                readOnly
                value={href}
                innerRef={input => (this.input = input)}
                onClick={this.handleCopy}
              />
            </SansGrow>
            <Sans size="2" weight="medium" color="black60">
              <a onClick={this.handleCopy}>{this.state.copyLabelText}</a>
            </Sans>
          </Flex>
          <Separator />
          <Flex flexDirection="row" flexWrap="wrap">
            {this.renderShareButton({
              service: "facebook",
              label: "Facebook",
              message: "Post to Facebook",
              href: `https://www.facebook.com/sharer/sharer.php?u=${href}`,
            })}
            {this.renderShareButton({
              service: "twitter",
              label: "Twitter",
              message: "Share on Twitter",
              href: `https://twitter.com/intent/tweet?original_referer=${href}&text=${imageDescription}&url=${href}&via=artsy`,
            })}
            {this.renderShareButton({
              service: "mail",
              label: "Mail",
              message: "Share via email",
              href: `mailto:?subject=${imageDescription}&body=Check out ${imageDescription} on Artsy: ${href}`,
            })}
            {this.renderShareButton({
              service: "pinterest",
              label: "Pinterest",
              message: "Pin It on Pinterest",
              href: `https://pinterest.com/pin/create/button/?url=${href}&media=${shareImageUrl}&description=${imageDescription}`,
            })}
            {this.renderShareButton({
              service: "tumblr",
              label: "Tumblr",
              message: "",
              href: `https://www.tumblr.com/share/photo?source=${shareImageUrl}&caption=${imageDescription}&clickthru=${href}`,
            })}
          </Flex>
        </Flex>
      </Container>
    )
  }
}

export const ArtworkSharePanelFragmentContainer = createFragmentContainer(
  ArtworkSharePanel,
  graphql`
    fragment ArtworkSharePanel_artwork on Artwork {
      href
      images {
        url
      }
      imageDescription: description
      title
      date
      artists {
        name
      }
      partner {
        name
      }
    }
  `
)

// TODO: We need to figure out if this is going to be a new re-usable panel type
//       in which I wouldn’t want to add this into Share
const Container = styled.div`
  position: absolute;
  width: 300px;
  top: -230px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const CloseIcon = styled(Icon)`
  color: ${color("black30")};
  cursor: pointer;
  font-size: 12px;
`

const SansGrow = styled(Sans)`
  display: flex;
  flex-grow: 1;
`

const URLInput = styled.input`
  border: 0;
  text-overflow: ellipsis;
  display: flex;
  flex-grow: 1;
  color: inherit;

  &:hover {
    color: ${color("black100")};
  }

  &::selection {
    color: ${color("white100")};
    background: ${color("purple100")};
  }
`

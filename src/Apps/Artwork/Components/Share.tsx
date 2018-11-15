import { color, Flex, Sans, Separator } from "@artsy/palette"
import { IconName } from "Assets/Icons"
import Icon from "Components/Icon"
import React from "react"
import styled from "styled-components"

interface ShareProps {
  url: string
  handleClose?: () => void
}

// TODO: We need to figure out if this is going to be a new re-usable panel type
//       in which I wouldn’t want to add this into Share
const Container = styled.div`
  position: relative;
  width: 300px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`
const CloseIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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

const Platform: React.SFC<{ iconName: IconName; title: string }> = ({
  iconName,
  title,
}) => (
  <Flex flexDirection="row" flexBasis="50%" mt={2}>
    <Icon name={iconName} color="black" />
    <Sans size="3" color="black60">
      <a>{title}</a>
    </Sans>
  </Flex>
)

export class Share extends React.Component<ShareProps> {
  private input: HTMLInputElement

  selectURL = () => {
    this.input.focus()
    this.input.setSelectionRange(0, this.input.value.length)
    document.execCommand("copy")
  }

  render() {
    return (
      <Container>
        <CloseIconWrapper>
          <CloseIcon name="close" onClick={this.props.handleClose} />
        </CloseIconWrapper>
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
                value={this.props.url}
                innerRef={input => (this.input = input)}
                onClick={this.selectURL}
              />
            </SansGrow>
            <Sans size="2" weight="medium" color="black60">
              <a onClick={this.selectURL}>Copy</a>
            </Sans>
          </Flex>
          <Separator />
          <Flex flexDirection="row" flexWrap="wrap">
            <Platform iconName="facebook" title="Facebook" />
            <Platform iconName="twitter" title="Twitter" />
            <Platform iconName="mail" title="Email" />
            <Platform iconName="pinterest" title="Pinterest" />
            <Platform iconName="tumblr" title="Tumblr" />
          </Flex>
        </Flex>
      </Container>
    )
  }
}

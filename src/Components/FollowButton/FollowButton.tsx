import React from "react"
import styled from "styled-components"
import { Clickable, Sans, color } from "@artsy/palette"

interface Props {
  handleFollow?: () => void
  isFollowed?: boolean
}

interface State {
  showUnfollow: boolean
}

export class FollowButton extends React.Component<Props, State> {
  static defaultProps = {
    isFollowed: false,
  }

  state = {
    showUnfollow: false,
  }

  render() {
    const { showUnfollow } = this.state
    const { handleFollow, isFollowed } = this.props

    const text = isFollowed
      ? showUnfollow
        ? "Unfollow"
        : "Following"
      : "Follow"

    return (
      <FollowButtonContainer
        data-test="followButton"
        isFollowed={isFollowed}
        onClick={handleFollow}
        onMouseEnter={() => this.setState({ showUnfollow: true })}
        onMouseLeave={() => this.setState({ showUnfollow: false })}
      >
        <Sans size="2" weight="medium">
          {text}
        </Sans>
      </FollowButtonContainer>
    )
  }
}

const FollowButtonContainer = styled(Clickable)<{
  isFollowed: boolean
}>`
  border: 1px solid ${color("black30")};
  width: 80px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isFollowed }) =>
    isFollowed ? color("black60") : color("black100")};
  cursor: pointer;

  &:hover {
    ${({ isFollowed }) =>
      !isFollowed &&
      `
      border-color: black;
      `}
    background: ${({ isFollowed }) =>
      isFollowed ? color("white100") : color("black100")};
    color: ${({ isFollowed }) =>
      isFollowed ? color("red100") : color("white100")};
  }
`

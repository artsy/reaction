import React from "react"
import { Button } from "Styleguide/Elements"
import { ButtonProps } from "Styleguide/Elements/Button"

interface Props {
  handleFollow?: any
  isFollowed?: boolean
  buttonProps?: Partial<ButtonProps>
}

interface State {
  showUnfollow: boolean
}

export class FollowButton extends React.Component<Props, State> {
  static defaultProps = {
    isFollowed: false,
    buttonProps: {},
  }

  state = {
    showUnfollow: false,
  }

  render() {
    const { showUnfollow } = this.state
    const { buttonProps, handleFollow, isFollowed } = this.props

    const text = isFollowed
      ? showUnfollow
        ? "Unfollow"
        : "Following"
      : "Follow"

    const props = {
      ...buttonProps,
      onClick: handleFollow,
      onMouseEnter: () => this.setState({ showUnfollow: true }),
      onMouseLeave: () => this.setState({ showUnfollow: false }),
    }

    return (
      <Button
        variant={isFollowed ? "secondaryOutline" : "primaryBlack"}
        {...props}
      >
        {text}
      </Button>
    )
  }
}

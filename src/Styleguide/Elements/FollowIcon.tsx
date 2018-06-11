import React from "react"
import styled from "styled-components"
import { themeGet } from "styled-system"
import Icon from "../../Components/Icon"
import { Flex } from "./Flex"
import { Serif } from "@artsy/palette"

interface FollowIconProps {
  readonly is_followed?: boolean | false
}

export const FollowIconContainer = styled(Flex)`
  align-items: center;
  color: ${themeGet("colors.black100")};
  cursor: pointer;
  .following,
  .unfollow {
    display: none;
  }
  &:hover {
    color: ${themeGet("colors.purple100")};
  }
  &[data-followed="true"] {
    .follow {
      display: none;
    }
    .following {
      display: inline-block;
    }
    &:hover {
      color: ${themeGet("colors.red100")};
      .following {
        display: none;
      }
      .unfollow {
        display: inline-block;
      }
    }
  }
`

export class FollowIcon extends React.Component<FollowIconProps> {
  render() {
    const isFollowed = this.props.is_followed
    const iconName = isFollowed ? "follow-circle.is-following" : "follow-circle"

    return (
      <FollowIconContainer data-followed={isFollowed}>
        <Icon
          name={iconName}
          style={{
            verticalAlign: "left",
            color: "inherit",
            margin: "-2px 0 0 -5px",
          }}
        />
        <Serif size="2" display="inline-block" className="follow">
          Follow
        </Serif>
        <Serif size="2" className="following">
          Following
        </Serif>
        <Serif size="2" className="unfollow">
          Unfollow
        </Serif>
      </FollowIconContainer>
    )
  }
}

import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "@artsy/palette"

interface Props {
  handleFollow?: () => void
  isFollowed?: boolean
}

export const FollowButton: React.FC<Props> = props => {
  const [showUnfollow, setShowUnfollow] = useState(false)
  const { handleFollow, isFollowed } = props

  const text = isFollowed ? (showUnfollow ? "Unfollow" : "Following") : "Follow"

  return (
    <FollowButtonContainer
      data-test="followButton"
      variant="secondaryOutline"
      size="small"
      onClick={handleFollow}
      onMouseEnter={() => setShowUnfollow(true)}
      onMouseLeave={() => setShowUnfollow(false)}
    >
      {text}
    </FollowButtonContainer>
  )
}

export const FollowButtonContainer = styled(Button)<{
  onMouseEnter: () => void
  onMouseLeave: () => void
}>``

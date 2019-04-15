import { GeneToolTip_gene } from "__generated__/GeneToolTip_gene.graphql"
import { garamond } from "Assets/Fonts"
import { FollowGeneButtonFragmentContainer as FollowGeneButton } from "Components/FollowButton/FollowGeneButton"
import PropTypes from "prop-types"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { FollowTrackingData } from "../../FollowButton/Typings"
import { getFullArtsyHref } from "../Constants"
import { ToolTipDescription } from "./Components/Description"

export interface GeneProps {
  gene: GeneToolTip_gene
  tracking?: TrackingProp
}

export class GeneToolTip extends React.Component<GeneProps> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onOpenAuthModal: PropTypes.func,
  }

  trackClick = () => {
    const { tracking } = this.props
    const { href } = this.props.gene

    tracking.trackEvent({
      action: "Click",
      flow: "tooltip",
      type: "gene stub",
      contextModule: "intext tooltip",
      destination_path: href,
    })
  }

  render() {
    const { description, href, id, _id, image, name } = this.props.gene
    const { url } = image
    const {
      tooltipsData: { genes },
      onOpenAuthModal,
    } = this.context

    const trackingData: FollowTrackingData = {
      contextModule: "tooltip",
      entity_id: _id,
      entity_slug: id,
      entity_type: "gene",
    }

    return (
      <Wrapper>
        <GeneContainer
          href={getFullArtsyHref(href)}
          target="_blank"
          onClick={this.trackClick}
        >
          {url && <Image src={url} />}
          <Title>{name}</Title>

          {description && <ToolTipDescription text={description} />}
        </GeneContainer>

        <ToolTipFooter>
          <FollowGeneButton
            gene={genes[id]}
            trackingData={trackingData}
            onOpenAuthModal={onOpenAuthModal}
          />
        </ToolTipFooter>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 240px;

  a:hover {
    color: black;
  }
`

export const GeneContainer = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
  padding-bottom: 10px;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
  padding-bottom: 10px;
`

const Image = styled.img`
  width: 100%;
  padding-bottom: 10px;
  max-height: 160px;
  object-fit: cover;
`

export const ToolTipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const GeneToolTipContainer = track()(
  createFragmentContainer(GeneToolTip, {
    gene: graphql`
      fragment GeneToolTip_gene on Gene {
        description
        href
        id
        _id
        image {
          url(version: "tall")
        }
        name
      }
    `,
  })
)

import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { garamond } from "Assets/Fonts"
import { getFullArtsyHref } from "../Constants"
import { track } from "../../../Utils/track"
import { GeneToolTip_gene } from "../../../__generated__/GeneToolTip_gene.graphql"
import { NewFeature, NewFeatureContainer } from "./Components/NewFeature"
import { ToolTipDescription } from "./Components/Description"
import FollowGeneButton from "../../FollowButton/FollowGeneButton"

export interface GeneProps {
  gene: GeneToolTip_gene
  tracking?: any
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
      type: "intext_tooltip",
      context_module: "tooltip",
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

    const trackingData = {
      context_module: "tooltip",
      tooltip_entity_id: _id,
      tooltip_entity_slug: href,
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
            gene={genes[id] as any}
            trackingData={trackingData}
            onOpenAuthModal={onOpenAuthModal}
          />
          <NewFeature />
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
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
  max-height: 160px;
  object-fit: cover;
`

export const ToolTipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${NewFeatureContainer} {
    display: flex;
    flex-direction: column;
  }
`

export const GeneToolTipContainer = track()(
  createFragmentContainer(
    GeneToolTip,
    graphql`
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
    `
  )
)

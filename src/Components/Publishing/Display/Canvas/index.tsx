import { color } from "@artsy/palette"
import { avantgarde, garamond } from "Assets/Fonts"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import { get } from "lodash"
import React from "react"
import track from "react-tracking"
import Waypoint from "react-waypoint"
import { data as sd } from "sharify"
import styled, { StyledFunction } from "styled-components"
import { ErrorBoundary } from "../../../ErrorBoundary"
import { pMedia } from "../../../Helpers"
import { getCurrentUnixTimestamp } from "../../Constants"
import { PixelTracker, replaceWithCacheBuster } from "../ExternalTrackers"
import { trackImpression, trackViewability } from "../track-once"
import { CanvasContainer, unitLayout } from "./CanvasContainer"

interface DisplayCanvasProps {
  unit: any
  campaign: any
  article?: any
  renderTime?: number
  tracking?: any
  adUnit: AdUnit
  adDimension: AdDimension
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  layout: string
}

@track()
export class DisplayCanvas extends React.Component<DisplayCanvasProps> {
  constructor(props) {
    super(props)
    this.trackViewability = this.trackViewability.bind(this)
    this.trackImpression = this.trackImpression.bind(this)
  }

  @trackImpression(props => unitLayout(props))
  trackImpression() {
    // noop
  }

  @trackViewability(props => unitLayout(props))
  trackViewability() {
    // noop
  }

  renderCanvasContent() {
    const {
      unit,
      campaign,
      article,
      adUnit,
      adDimension,
      renderTime,
    } = this.props
    const url = unit.link ? get(unit, "link.url", "") : ""
    const allowedUsers = (sd.HASHTAG_LAB_ADS_ALLOWLIST || "")
      .split(",")
      .filter(Boolean)
    const currentUser = get(sd, "CURRENT_USER.email", "")
    const disclaimer = (
      <Disclaimer layout={unit.layout}>{unit.disclaimer}</Disclaimer>
    )

    // TODO: Remove the allowlist and env checks after externally served ads are implemented
    if (
      allowedUsers.includes(currentUser) &&
      process.env.NODE_ENV !== "production"
    ) {
      return (
        <div
          className="htl-ad"
          data-unit={adUnit}
          data-sizes={adDimension}
          data-eager
        />
      )
    }

    return (
      <>
        <a
          href={replaceWithCacheBuster(url, getCurrentUnixTimestamp())}
          target="_blank"
        >
          <SponsoredBy>{`Sponsored by ${campaign.name}`}</SponsoredBy>
        </a>
        <CanvasContainer
          unit={unit}
          campaign={campaign}
          article={article}
          disclaimer={disclaimer}
        />
        {unit.layout === "overlay" && disclaimer}
        // TODO: Determine how to handle DisplayContainer layout and tracking
        when this component no longer receives unit prop
        <PixelTracker unit={unit} date={renderTime} />
      </>
    )
  }

  render() {
    const { unit } = this.props
    return (
      <ErrorBoundary>
        <DisplayContainer layout={unit.layout}>
          <Waypoint onEnter={this.trackImpression} />
          <Waypoint bottomOffset="50%" onEnter={this.trackViewability} />
          {this.renderCanvasContent()}
        </DisplayContainer>
      </ErrorBoundary>
    )
  }
}

const Div: StyledFunction<DivProps> = styled.div

export const DisplayContainer = Div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: fit-content;
  max-width: ${props => (props.layout === "slideshow" ? "100%;" : "1250px;")}
  margin: 0 auto;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
`
const SponsoredBy = styled.div`
  ${avantgarde("s11")};
  color: ${color("black30")};
  margin: 10px 0;
  text-align: center;
`
const Disclaimer = Div`
  ${garamond("s11")}
  color: ${color("black30")};
  margin: 15px 0 0 0;
  ${props => props.layout === "overlay" && "text-align: center;"}
  ${pMedia.sm`
    margin: 35px 0 10px 0;
  `}
`

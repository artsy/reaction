import { Box, Flex, Link, Sans } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import {
  Auction,
  BlueChip,
  Book,
  Fair,
  Group,
  Museum,
  Solo,
  TopEmerging,
  TopEstablished,
} from "Assets/SVGIcons"
import React from "react"

interface ArtistInsightProps {
  type: string
  label: string
  value?: string
  entities?: ReadonlyArray<string>
}

const ICON_MAPPING = {
  HIGH_AUCTION: Auction,
  SOLO_SHOW: Solo,
  GROUP_SHOW: Group,
  BIENNIAL: Fair,
  REVIEWED: Book,
  COLLECTED: Museum,
  BLUE_CHIP: BlueChip,
  TOP_ESTABLISHED: TopEstablished,
  TOP_EMERGING: TopEmerging,
}

@track<ArtistInsightProps>(props => ({
  context_module: Schema.ContextModule.ArtistInsights,
  context_submodule: props.type,
}))
export class ArtistInsight extends React.Component<ArtistInsightProps> {
  state = {
    expanded: false,
  }

  @track<ArtistInsightProps>(() => ({
    action_type: Schema.ActionType.Click,
    subject: "Read more",
    type: "Link",
  }))
  handleExpand() {
    this.setState({ expanded: true })
  }

  renderEntities() {
    const { entities } = this.props

    if (!entities || entities.length < 1) {
      return null
    } else if (this.state.expanded) {
      return (
        <Sans size="2" verticalAlign="top" color="black60">
          {entities.join(", ")}.
        </Sans>
      )
    } else {
      return (
        <Sans size="2" verticalAlign="top" color="black60" textAlign="left">
          {entities[0]}

          {entities.length > 1 && (
            <>
              , and{" "}
              <Link onClick={this.handleExpand.bind(this)}>
                {entities.length - 1}&nbsp;more
              </Link>
            </>
          )}
        </Sans>
      )
    }
  }

  renderIcon(insightType) {
    const Component = ICON_MAPPING[insightType]

    return <Component />
  }

  render() {
    const { label, type, value, entities } = this.props

    if (value || (entities && entities.length > 0)) {
      return (
        <Flex mt={1} width={["100%", "50%"]}>
          <Flex pr={1} alignItems="top">
            {this.renderIcon(type)}
          </Flex>
          <Flex flexDirection="column">
            <Box>
              <Sans size="2">{label}</Sans>
              {value && (
                <Sans size="2" color="black60">
                  {value}
                </Sans>
              )}
              {this.renderEntities()}
            </Box>
          </Flex>
        </Flex>
      )
    }
  }
}

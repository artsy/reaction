import { Sans } from "@artsy/palette"
import { SelectedExhibitions_exhibitions } from "__generated__/SelectedExhibitions_exhibitions.graphql"
import { groupBy, toPairs } from "lodash"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PreloadLink } from "Router/PreloadLink"
import { BorderBox, Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Utils/Responsive"

const MIN_FOR_SELECTED_EXHIBITIONS = 3
const MIN_EXHIBITIONS = 2

export type Year = string

export const isCollapsed = props => props.collapsible && !props.expanded

export interface ExhibitionsHeadlineProps {
  exhibitionCount: number
  expanded: boolean
  collapsible: boolean
  onShowClicked: (event: React.MouseEvent<HTMLElement>) => void
}
export const ExhibitionsHeadline: SFC<ExhibitionsHeadlineProps> = props => (
  <Flex justifyContent="space-between" mb={isCollapsed(props) ? 0 : 1}>
    <Sans size="2" weight="medium">
      {props.exhibitionCount < MIN_FOR_SELECTED_EXHIBITIONS
        ? "Exhibitions"
        : "Selected exhibitions"}
      {isCollapsed(props) ? ` (${props.exhibitionCount})` : ""}
    </Sans>
    {isCollapsed(props) && (
      <div onClick={props.onShowClicked} style={{ cursor: "pointer" }}>
        <Sans size="2" color="black60" ml={2}>
          Show
        </Sans>
      </div>
    )}
  </Flex>
)

export interface ExhibitionYearListProps {
  year: Year
  exhibitions: SelectedExhibitions_exhibitions
}
export const ExhibitionYearList: SFC<ExhibitionYearListProps> = props => (
  <Flex>
    <Sans size="2">{props.year}</Sans>
    <Flex flexDirection="column">
      {props.exhibitions.map(exhibition => (
        <Box key={exhibition.name} display="inline" ml={1}>
          <Sans size="2" display="inline" verticalAlign="top">
            {exhibition.name}
            {", "}
          </Sans>
          <Sans size="2" display="inline" verticalAlign="top" color="black60">
            {exhibition.partner.name}
          </Sans>
        </Box>
      ))}
    </Flex>
  </Flex>
)

interface FullExhibitionListProps {
  exhibitions: SelectedExhibitions_exhibitions
  artistID: string
  totalExhibitions: number
}
const FullExhibitionList: SFC<FullExhibitionListProps> = props => (
  <React.Fragment>
    {toPairs(groupBy(props.exhibitions, ({ start_at }) => start_at))
      .reverse()
      .map(([year, exhibitions]) => (
        <ExhibitionYearList
          key={year}
          year={year}
          exhibitions={exhibitions.reverse()}
        />
      ))}
    {props.totalExhibitions > MIN_FOR_SELECTED_EXHIBITIONS && (
      <Sans size="2" color="black60">
        <PreloadLink to={`/artist/${props.artistID}/cv`}>View all</PreloadLink>
      </Sans>
    )}
  </React.Fragment>
)

export interface SelectedExhibitionsProps {
  exhibitions: SelectedExhibitions_exhibitions
  artistID?: string
  totalExhibitions?: number
}

export interface SelectedExhibitionsContainerProps
  extends SelectedExhibitionsProps {
  collapsible?: boolean
}

export class SelectedExhibitionsContainer extends React.Component<
  SelectedExhibitionsContainerProps
> {
  state = {
    expanded: false,
  }
  render() {
    if (
      !this.props.exhibitions ||
      this.props.totalExhibitions < MIN_EXHIBITIONS
    )
      return null
    return (
      <BorderBox width="100%">
        <Flex flexDirection="column">
          <ExhibitionsHeadline
            expanded={this.state.expanded}
            collapsible={this.props.collapsible}
            exhibitionCount={this.props.exhibitions.length}
            onShowClicked={() => this.setState({ expanded: true })}
          />
          {!isCollapsed({
            expanded: this.state.expanded,
            ...this.props,
          }) && (
            <FullExhibitionList
              artistID={this.props.artistID}
              exhibitions={this.props.exhibitions}
              totalExhibitions={this.props.totalExhibitions}
            />
          )}
        </Flex>
      </BorderBox>
    )
  }
}

export const SelectedExhibitions: SFC<SelectedExhibitionsProps> = props => (
  <Responsive>
    {({ xs }) => {
      if (xs) return <SelectedExhibitionsContainer collapsible {...props} />
      else return <SelectedExhibitionsContainer {...props} />
    }}
  </Responsive>
)

export const SelectedExhibitionFragmentContainer = createFragmentContainer(
  SelectedExhibitions,
  graphql`
    fragment SelectedExhibitions_exhibitions on Show @relay(plural: true) {
      partner {
        ... on ExternalPartner {
          name
        }
        ... on Partner {
          name
        }
      }
      name
      start_at(format: "YYYY")
      cover_image {
        cropped(width: 800, height: 600) {
          url
        }
      }
      city
    }
  `
)

import React, { SFC } from "react"
import { Flex } from "../Elements/Flex"
import { Box, BorderBox } from "../Elements/Box"
import { Responsive } from "../Utils/Responsive"
import { Sans } from "@artsy/palette"
import { groupBy, toPairs } from "lodash"

const MIN_FOR_SELECTED_EXHIBITIONS = 3
const MIN_EXHIBITIONS = 2

type Year = string

export interface Exhibition {
  year: Year
  show: string
  gallery: string
}

export const isCollapsed = props => props.collapsible && !props.expanded

export interface ExhibitionsHeadlineProps {
  exhibitionCount: number
  expanded: boolean
  collapsible: boolean
  onShowClicked: Function
}
export const ExhibitionsHeadline: SFC<ExhibitionsHeadlineProps> = props => (
  <Flex justifyContent="space-between" mb={isCollapsed(props) ? 0 : 3}>
    <Sans size="2" weight="medium">
      {props.exhibitionCount < MIN_FOR_SELECTED_EXHIBITIONS
        ? "Exhibitions"
        : "Selected exhibitions"}
      {isCollapsed(props) ? ` (${props.exhibitionCount})` : ""}
    </Sans>
    {isCollapsed(props) && (
      <Sans size="2" color="black60" ml={4} onClick={props.onShowClicked}>
        Show
      </Sans>
    )}
  </Flex>
)

export interface ExhibitionYearListProps {
  year: Year
  exhibitions: Exhibition[]
}
export const ExhibitionYearList: SFC<ExhibitionYearListProps> = props => (
  <Flex>
    <Sans size="2">{props.year}</Sans>
    <Flex flexDirection="column">
      {props.exhibitions.map(exhibition => (
        <Box key={exhibition.show} display="inline" ml={3}>
          <Sans size="2" display="inline" verticalAlign="top">
            {exhibition.show}
            {", "}
          </Sans>
          <Sans size="2" display="inline" verticalAlign="top" color="black60">
            {exhibition.gallery}
          </Sans>
        </Box>
      ))}
    </Flex>
  </Flex>
)

interface FullExhibitionListProps {
  exhibitions: Exhibition[]
}
const FullExhibitionList: SFC<FullExhibitionListProps> = props => (
  <React.Fragment>
    {toPairs(groupBy(props.exhibitions, ({ year }) => year))
      .reverse()
      .map(([year, exhibitions]) => (
        <ExhibitionYearList
          key={year}
          year={year}
          exhibitions={exhibitions.reverse()}
        />
      ))}
    <Sans size="2" color="black60">
      View all
    </Sans>
  </React.Fragment>
)

export interface SelectedExhibitionsProps {
  exhibitions: Exhibition[]
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
    if (this.props.exhibitions.length < MIN_EXHIBITIONS) return null
    return (
      <BorderBox>
        <Flex flexDirection="column">
          <ExhibitionsHeadline
            expanded={this.state.expanded}
            collapsible={this.props.collapsible}
            exhibitionCount={this.props.exhibitions.length}
            onShowClicked={() => this.setState({ expanded: true })}
          />
          {!isCollapsed({ expanded: this.state.expanded, ...this.props }) && (
            <FullExhibitionList exhibitions={this.props.exhibitions} />
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

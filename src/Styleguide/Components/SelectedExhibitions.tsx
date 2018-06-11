import React, { SFC } from "react"
import { Flex } from "../Elements/Flex"
import { Box, BorderBox } from "../Elements/Box"
import { Sans } from "@artsy/palette"

const MIN_FOR_SELECTED_EXHIBITIONS = 3
const MIN_EXHIBITIONS = 2

type Year = string

export interface Exhibition {
  year: Year
  show: string
  gallery: string
}

type GroupedExhibitions = [Year, Exhibition[]]

const groupExhibitions = (exhibitions: Exhibition[]): GroupedExhibitions[] => {
  const exhibitionsByYear = exhibitions.reduce((acc, curr) => {
    const { year } = curr
    acc[year] = [].concat(acc[year], curr)
    return acc
  }, {})
  return Object.keys(exhibitionsByYear)
    .reverse()
    .map(year => [year, exhibitionsByYear[year]] as GroupedExhibitions)
}

export interface ExhibitionsHeadlineProps {
  exhibitionCount: number
  expanded: boolean
  collapsible: boolean
}
const ExhibitionsHeadline: SFC<ExhibitionsHeadlineProps> = props => (
  <Flex justifyContent="space-between">
    <Sans size="2" weight="medium" mb={3}>
      {props.exhibitionCount < MIN_FOR_SELECTED_EXHIBITIONS
        ? "Exhibitions"
        : "Selected exhibitions"}
      {props.collapsible && !props.expanded
        ? ` (${props.exhibitionCount})`
        : ""}
    </Sans>
    {props.collapsible &&
      !props.expanded && (
        <Sans size="2" color="black60">
          Show
        </Sans>
      )}
  </Flex>
)

export interface ExhibitionYearListProps {
  year: Year
  exhibitions: Exhibition[]
}
const ExhibitionYearList: SFC<ExhibitionYearListProps> = props => (
  <Flex>
    <Sans size="2">{props.year}</Sans>
    <Flex flexDirection="column">
      {props.exhibitions.filter(e => e).map(exhibition => (
        <Box display="inline" ml={3}>
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
    {groupExhibitions(props.exhibitions).map(([year, exhibitions]) => (
      <ExhibitionYearList year={year} exhibitions={exhibitions} />
    ))}
    <Sans size="2" color="black60">
      View all
    </Sans>
  </React.Fragment>
)

export interface SelectedExhibitionsProps {
  exhibitions: Exhibition[]
  collapsible?: boolean
}

export class SelectedExhibitions extends React.Component<
  SelectedExhibitionsProps
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
          />
          {(!this.props.collapsible || this.state.expanded) && (
            <FullExhibitionList exhibitions={this.props.exhibitions} />
          )}
        </Flex>
      </BorderBox>
    )
  }
}

import React, { Component, Fragment } from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { Fonts } from "../Fonts"
import { NewsBylineProps } from "./NewsByline"
import { track } from "../../../Utils/track"

interface Props {
  editSource?: any
}

@track()
export class DateSource extends Component<NewsBylineProps & Props, null> {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  @track({ action: "Clicked news source link" })
  onClick() {
    // noop
  }

  getNewsSource = source => {
    const { editSource } = this.props
    const hasSource = source && source.url
    if (!editSource && !hasSource) return null

    return (
      <Fragment>
        {hasSource && ", via"}&nbsp;
        {editSource ? (
          editSource
        ) : (
          <a href={source.url} target="_blank" onClick={this.onClick}>
            {source.title}
          </a>
        )}
      </Fragment>
    )
  }

  render() {
    const { news_source, published_at } = this.props.article
    return (
      <DateSourceContainer>
        {getDate(published_at || new Date(), "verbose")}
        {this.getNewsSource(news_source)}
      </DateSourceContainer>
    )
  }
}

const DateSourceContainer = styled.div`
  display: flex;
  ${Fonts.unica("s14")};

  ${pMedia.sm`
    ${Fonts.unica("s12")}
  `} a {
    color: ${colors.grayDark};
  }
  color: ${colors.grayDark};
`

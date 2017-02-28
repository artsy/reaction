import * as React from 'react'
import styled from 'styled-components'
import * as fonts from '../assets/fonts'

type TitleSize = "small" | "medium" | "large" | "xlarge" | "xxlarge"

interface TitleProps extends React.HTMLProps<Title> {
  titleSize?: TitleSize
}

const titleSizes = {
  small: '25px',
  medium: '30px',
  large: '37px',
  xlarge: '50px',
  xxlarge: '72px'
}

export class Title extends React.Component<TitleProps, any> {
  render() {
    return (
      <div className={this.props.className} >
        {this.props.children}
      </div>
    )
  }
}

const StyledTitle = styled(Title)`
  font-size: ${props => titleSizes[props.titleSize]};
  margin: 20px 0;
  ${fonts.secondary.style}
`

StyledTitle.defaultProps = {
  titleSize: 'medium'
}

export default StyledTitle
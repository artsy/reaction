import * as React from 'react'
import icons, { IconName } from '../assets/icons'
import styled from 'styled-components'
import colors from '../assets/colors'

export type FontName = string

interface IconProps extends React.Props<Icon>, React.HTMLAttributes<Icon> {
  font?: FontName
  name: IconName
  color?: string
}

class Icon extends React.Component<IconProps, null> {
  render() {
    return (
      <span className={this.props.className}>
        {icons[this.props.name]}
      </span>
    )
  }
}

export default styled(Icon)`
  font-family: ${props => props.font || 'artsy-icons'};
  color: ${props => props.color || 'purple'}
`;

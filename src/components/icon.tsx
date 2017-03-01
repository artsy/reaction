import * as React from 'react'
import icons, { IconName } from '../assets/icons'
import styled from 'styled-components'
import colors from '../assets/colors'
import '../assets/fonts'

export type FontName = string

export interface IconProps extends React.HTMLProps<JSX.Element> {
  font?: FontName
  name: IconName
  color?: string
}

const Icon: React.SFC<IconProps> = props => (
  <span className={props.className}>
    {icons[props.name]}
  </span>
)

export default styled(Icon)`
  font-family: ${props => props.font || 'artsy-icons'};
  color: ${props => props.color || 'purple'}
  font-size: 24px;
  margin: 0 5px;
`;

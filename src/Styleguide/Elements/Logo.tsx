import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

// tslint:disable-next-line:no-empty-interface
interface IconProps extends SpaceProps {}

const Icon = styled.svg.attrs<IconProps>({})`
  ${space};
`

export const Mark = props => (
  <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path d="M0 32h32V0H0v32zm29-3h-5v-5h-3v5H3V3h26v26z" />
    <path d="M12.1 6H9.63L5 17.6h2.38l1.25-3.2h4.47l1.22 3.2h2.39L12.1 6zm-2.77 6.4l1.53-4.13 1.52 4.13H9.33z" />
  </Icon>
)

export const Logo = props => (
  <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 44" {...props}>
    <path d="M4 4h121v36H75v-6h-4v6H4V4zM0 44h129V0H0v44z" />
    <path d="M26.26 14h-3.3L17.2 29h3.3l1.51-4.2h5.2L28.7 29H32l-5.74-15zm-3.35 8l1.7-4.55L26.28 22h-3.37zM55 14v3h5.28v12h3.42V17H69v-3zM108.02 14l-3.74 6.41-3.72-6.41h-3.62l5.8 9.47V29h3.1v-5.53l5.8-9.47zM90.63 21.1c-.96-.7-2.28-1.02-3.44-1.3l-.71-.18-.14-.04c-.95-.23-2.25-.56-2.25-1.7 0-1.2 1.41-1.52 2.24-1.52.95 0 2.13.28 2.42 1.63l.01.01h2.93v-.03c-.1-2.72-2.01-4.29-5.25-4.29-2.4 0-5.22 1.13-5.22 4.3 0 3.3 2.94 4 5.53 4.62l.7.17c1.32.35 1.99.96 1.99 1.82 0 1.86-2.44 1.96-2.93 1.96-1.71 0-2.64-.64-2.93-2.01v-.04H80.6v.05c.02 1.17.16 1.89.92 2.77 1.43 1.67 3.7 1.92 4.92 1.92 2.83 0 5.87-1.47 5.87-4.69a4.3 4.3 0 0 0-1.68-3.44M47.8 22.6a4.75 4.75 0 0 0 1.82-3.8c0-1.65-.84-3.18-2.2-3.99a6.36 6.36 0 0 0-3.47-.81H37.3v15h3.13v-7.41L46.23 29h3.8l-4.43-5.53c.8-.14 1.45-.32 2.2-.86M40.41 21v-4.02h3.52c.7 0 1.32.03 1.82.4.47.34.75.94.75 1.61 0 1.33-.95 2-2.83 2h-3.26v.01z" />
  </Icon>
)

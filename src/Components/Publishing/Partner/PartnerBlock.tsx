import React from 'react'
import styled from 'styled-components'
import { pMedia } from '../../Helpers'
import { Fonts } from '../Fonts'

interface Props {
  logo: string
  url: string
}

export const PartnerBlock: React.SFC<Props> = props => {
  const { logo, url } = props

  return (
    <PartnerBlockContainer className='PartnerBlock'>
      <Title>Presented In Partnership With</Title>
      <a href={url} target='_blank'>
        <img src={logo} />
      </a>
    </PartnerBlockContainer>
  )
}

const PartnerBlockContainer = styled.div`
  img {
    max-width: 220px;
    padding-top: 20px;
  }
  ${pMedia.sm`
    img {
      max-width: 195px;
    }
  `}
`
const Title = styled.div`
  ${Fonts.unica('s16', 'medium')}
  ${pMedia.sm`
    ${Fonts.unica('s14', 'medium')}
  `}
`

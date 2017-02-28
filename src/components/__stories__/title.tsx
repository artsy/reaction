import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Title from '../title'
import colors from '../../assets/colors'

storiesOf('Title', Title)
  .add('Titles', () =>(
    <div>
      <Title titleSize='xxlarge'>XXLarge Title: 72px</Title> 
      <Title titleSize='xlarge'>XLarge Title: 50px</Title> 
      <Title titleSize='large'>Large Title: 37px</Title> 
      <Title titleSize='medium'>Medium Title: 30px</Title> 
      <Title titleSize='small'>Small Title: 25px</Title> 
    </div>
  ))

import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"

import colors from "../../assets/colors"
import Title from "../title"

storiesOf("Title", Title)
  .add("Titles", () => (
    <div>
      <Title titleSize="xxlarge">XXLarge Title: 72px</Title> 
      <Title titleSize="xlarge">XLarge Title: 50px</Title> 
      <Title titleSize="large">Large Title: 37px</Title> 
      <Title titleSize="medium">Medium Title: 30px</Title> 
      <Title titleSize="small">Small Title: 25px</Title> 
    </div>
  ))

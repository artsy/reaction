import { storiesOf } from "@storybook/react"
import React from "react"

import colors from "../../Assets/Colors"
import Button from "../Buttons/Inverted"
import Icon from "../Icon"
import Input from "../Input"
// import ValidatedInput from "../ValidatedInput"
import TextArea from "../TextArea"

storiesOf("Components/Input", module)
  .add("Inputs", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" />
      <Input placeholder="First Name" error />
      <Input placeholder="First Name" disabled />

      <div style={{ paddingTop: 10 }}>
        <Input
          placeholder="Search"
          leftView={<Icon name="search" color={colors.graySemibold} />}
        />
      </div>

      <div style={{ paddingTop: 10 }}>
        <Input
          placeholder="Email"
          rightView={<Icon name="check" color={colors.greenRegular} />}
        />
      </div>
    </div>
  ))
  .add("Text Areas", () => (
    <div>
      <TextArea placeholder="Your Message" />
      <TextArea placeholder="Your Message" error />
      <TextArea placeholder="Your Message" disabled />
    </div>
  ))
  .add("Form", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="First Name" block />
      <TextArea placeholder="Your Message" block />
    </div>
  ))
  .add("Form w/ Button", () => (
    <div style={{ padding: 10 }}>
      <Input placeholder="Email" block />
      <Input type="password" placeholder="Password" block />
      <Button block>Submit</Button>
    </div>
  ))
// .add("With Custom Validation", () => {
//   // const validateOnBlur: (event: React.FocusEvent<HTMLInputElement>) => void = (
//   //   e => e.target.value === 'cow' ?
//   // )
//   return (
//     <div style={{ padding: 10 }}>
//       <ValidatedInput placeholder="cow" block />
//     </div>
//   )
// })

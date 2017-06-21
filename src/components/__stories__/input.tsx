import { storiesOf } from "@storybook/react"
import * as React from "react"

import Button from "../buttons/inverted"
import Input from "../input"
import TextArea from "../text_area"

storiesOf("Input", Input)
    .add("Inputs", () => (
        <div>
            <Input placeholder="First Name" />
            <Input placeholder="First Name" error />
            <Input placeholder="First Name" disabled />
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
        <div style={{padding: 10}}>
            <Input placeholder="First Name" block />
            <TextArea placeholder="Your Message" block />
        </div>
    ))
    .add("Form w/ Button", () => (
        <div style={{padding: 10}}>
            <Input placeholder="Email" block />
            <Input type="password" placeholder="Password" block />
            <Button block>Submit</Button>
        </div>
    ))
